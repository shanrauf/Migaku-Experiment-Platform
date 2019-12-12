import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { IUser, IUserInputDTO } from "../interfaces/IUser";
import {
  EventDispatcher,
  EventDispatcherInterface
} from "../decorators/eventDispatcher";
import config from "../config";
import { Container, Service, Inject } from "typedi";

@Service()
export default class AuthService {
  constructor(
    @Inject("Participant") private Participant: Models.Participant,
    @Inject("logger") private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    // this.Participant.b;
    // const person = new Participant()
  }

  async SignUp(email, password, name, discordUsername, age, sex) {
    // instead of many params, could pass object using typescript interface as the object u want (DTO)
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
    Participant.findOne({ where: { email: email } }).then(participant => {
      if (participant) {
        errors.push({ msg: "Email already exists" });
        console.log("Error");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newParticipant.password, salt, (err, hash) => {
            if (err) throw err;
            let newParticipant = Participant.build({
              email,
              password: hash,
              name,
              discordUsername,
              age,
              sex
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
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw new Error("User not registered");
    }
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = this.generateToken(userRecord);
      const user = userRecord.toObject();
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
