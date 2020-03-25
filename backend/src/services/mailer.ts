import { Service, Inject } from 'typedi';

export type SendgridMessage = {
  to: string;
  from: string;
  /**
   * This is the heading/title of the email
   */
  subject: string;

  /**
   * This is the text content of the email
   */
  text: string;

  /**
   * This is custom HTML you can add to the email body
   */
  html?: string;
};

@Service()
export default class MailerService {
  constructor(@Inject('emailClient') private emailClient) {}

  public async SendWelcomeEmail(email) {
    const msg: SendgridMessage = {
      to: email,
      from: 'massimmersionapproach@gmail.com',
      subject: 'MIA Message',
      text: 'Thanks for being a part of MIA!'
    };

    this.SendEmail(msg);
    // this.emailClient.messages().send(data);
    // return { delivered: 1, status: "ok" };
  }

  private async SendEmail(message: SendgridMessage) {
    //   this.emailClient.send(message);
  }
}
