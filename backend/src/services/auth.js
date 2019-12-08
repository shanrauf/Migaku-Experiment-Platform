import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import config from "../config";
import { Participant } from "../models/participant.js";
export default class AuthService {
  constructor() {}

  async SignUp(email, password, name, discordUsername, age, sex) {
    // instead of many params, could pass object using typescript interface as the object u want (DTO)
    let errors = [];

    if (!name || !email || !password) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    // if (errors.length > 0) {
    //   res.render('register', {
    //     errors,
    //     name,
    //     email,
    //     password,
    //     password2
    //   });
    // }
    Participant.findOne({ where: { email: email } }).then(participant => {
      if (participant) {
        errors.push({ msg: "Email already exists" });
        console.log("Error");
        // res.render('register', {
        //   errors,
        //   name,
        //   email,
        //   password,
        //   password2
        // });
      } else {
        let newParticipant = Participant.build({
          email,
          password,
          name,
          discordUsername,
          age,
          sex
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newParticipant.password, salt, (err, hash) => {
            if (err) throw err;
            newParticipant.password = hash;
            newParticipant
              .save()
              .then(participant => {
                // req.flash(
                //   'success_msg',
                //   'You are now registered and can log in'
                // );
                // res.redirect('/users/login');
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
