import jwt from "jsonwebtoken";
import config from "../config";

export default class AuthService {
  constructor() // @Inject('logger') private logger, // private mailer: MailerService, // @Inject('userModel') private userModel: Models.UserModel, //
  // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  {}

  async SignUp(username, email, password) {
    // cool way to do this is to hve a typescript interface as the object u want (DTO)
    try {
      const salt = randomBytes(32);

      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      const userRecord = await this.userModel.create({
        username,
        email,
        password,
        salt: salt.toString("hex"),
        password: hashedPassword
      });
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error("User cannot be created");
      }

      let user = userRecord; // need to map?

      return { user, token };
    } catch (e) {
      console.log(e);
      throw e;
    }
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

  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    let jwtToken = getTokenFor(user); // fix
    return jwtToken;
  }
}
