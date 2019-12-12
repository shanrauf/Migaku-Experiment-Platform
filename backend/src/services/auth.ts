import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { IUser, IUserInputDTO } from "../interfaces/IUser";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import config from "../config";
import { Container, Service, Inject } from "typedi";
import { PassportStatic } from "passport";
import winston from "winston";
@Service()
export default class AuthService {
  constructor(
    @Inject("Participant") private Participant: Models.Participant,
    @Inject("passport") private passport: PassportStatic,
    @Inject("logger") private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  async SignUp(IUserInputDTO: IUserInputDTO) {
    const { email, password, name } = IUserInputDTO;
    let errors = [];

    if (!name || !email || !password) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      console.log("Validation error");
    }
    this.Participant.findOne({ where: { email: email } }).then(participant => {
      if (participant) {
        errors.push({ msg: "Email already exists" });
        console.log("Error");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            let newParticipant = this.Participant.build({
              email,
              password: hash,
              name,
              discordUsername: null,
              age: null,
              sex: null
            });
            newParticipant
              .save()
              .then(participant => {
                // return json of participant info and token?
                let token = this.generateToken(participant);
                return { participant, token };
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }

  async SignIn(email, password) {
    const participantRecord = await this.Participant.findOne();
    if (!participantRecord) {
      throw new Error("User not registered");
    }
    const validPassword = await jwt.verify(participantRecord, password); // (participantRecord.password, password)
    if (validPassword) {
      const token = this.generateToken(participantRecord);
      const user = participantRecord; // .toObject()
      return { user, token };
    } else {
      throw new Error("Invalid Password");
    }
  }

  generateToken(participant) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    let jwtToken = jwt.sign(JSON.stringify(participant), config.jwtSecret);
    return jwtToken;
  }
}
