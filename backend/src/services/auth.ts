import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { IUser, IUserInputDTO } from "../interfaces/IUser";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import config from "../config";
import { Service, Inject } from "typedi";
import { PassportStatic } from "passport";
import winston from "winston";
import { randomIdGenerator } from "../utils";
import events from "../subscribers/events";

@Service()
export default class AuthService {
  constructor(
    @Inject("Participant") private Participant: Models.ParticipantModel,
    @Inject("passport") private passport: PassportStatic,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ participant: any; token: string }> {
    const { email, password, name, age, sex } = userInputDTO;
    this.Participant.findOne({ where: { email } }).then(existingParticipant => {
      if (existingParticipant) {
        // return error that the email already exists
        console.error("Already existss");
      }
    });
    this.logger.silly("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10);
    let newParticipant = this.Participant.create({
      participantId: randomIdGenerator(),
      email,
      password: hashedPassword,
      name,
      discordUsername: null,
      age,
      sex,
      lastLogin: new Date()
    })
      .then(participantRecord => {
        this.eventDispatcher.dispatch(events.participant.signUp, {
          participant: participantRecord
        });
        /**
         * @TODO This is a bad way to delete fields...
         * There should exist a 'Mapper' layer
         * that transforms data from layer to layer
         * but that's too over-engineering for now
         */
        const participant: any = participantRecord.toJSON();
        Reflect.deleteProperty(participant, "password");
        Reflect.deleteProperty(participant, "participantId");
        this.logger.silly("Generating JWT");
        const token = this.generateToken(participant.email);
        return { participant, token };
      })
      .catch(err => {
        console.log(err);
        return { participant: {}, token: "" };
      });
    return newParticipant;
  }

  async SignIn(participant): Promise<{ participant: any; token: string }> {
    Reflect.deleteProperty(participant, "password");
    Reflect.deleteProperty(participant, "participantId");

    const token = this.generateToken(participant);
    return { participant, token };
  }

  generateToken(email: any) {
    const today = new Date();
    const exp = new Date(today);
    const expires = exp.setDate(today.getDate() + 30);
    const payload = {
      email,
      expires
    };
    let jwtToken = jwt.sign(JSON.stringify(payload), config.jwtSecret);
    return jwtToken;
  }
}