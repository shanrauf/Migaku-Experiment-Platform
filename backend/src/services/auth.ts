import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Container, { Service, Inject } from 'typedi';
import { PassportStatic } from 'passport';
import winston from 'winston';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '../decorators/eventDispatcher';
import config from '../config';
import { randomIdGenerator } from '../utils';
import events from '../subscribers/events';
import { Participant } from '../models/participant';
import LoggerInstance from '../loaders/logger';
import { IParticipantSignupDTO } from '../interfaces/IParticipant';

@Service()
export default class AuthService {
  constructor(
    @Inject('passport') private passport: PassportStatic,
    @Inject('logger') private logger: winston.Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {}

  public async SignUp(
    participantSignupDTO: IParticipantSignupDTO
  ): Promise<{ participant: any; token: string }> {
    try {
      const logger = Container.get(LoggerInstance);
      const { email, password, name, age, sex } = participantSignupDTO;
      Participant.findOne({ where: { email } }).then(existingParticipant => {
        if (existingParticipant) {
          // #TODO: return error that the email already exists
          logger.error('Already exists');
          throw new Error('Email already exists');
        }
      });
      this.logger.silly('Hashing password');
      const hashedPassword = await bcrypt.hash(password, 10);
      const newParticipant = Participant.create({
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
          Reflect.deleteProperty(participant, 'password');
          Reflect.deleteProperty(participant, 'participantId');
          this.logger.silly('Generating JWT');
          const token = this.generateToken(participant.email);
          return { participant, token };
        })
        .catch(err => {
          this.logger.error(err);
          return { participant: {}, token: '' };
        });
      return newParticipant;
    } catch (e) {
      throw e;
    }
  }

  async SignIn(
    participant: any
  ): Promise<{ participant: Participant; token: string }> {
    Reflect.deleteProperty(participant, 'password');
    Reflect.deleteProperty(participant, 'participantId');

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
    const jwtToken = jwt.sign(JSON.stringify(payload), config.jwtSecret);
    return jwtToken;
  }
}
