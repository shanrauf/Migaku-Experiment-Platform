export interface IParticipant {
  readonly participantId: string;
  email: string;
  password: string;
  name: string;
  discordUsername: string;
  age: number;
  sex: string;
  lastLogin: Date;
}

export interface IParticipantSignupDTO {
  // signup/in
  name: string;
  email: string;
  password: string;
  age: number;
  sex: string;
}

export interface IParticipantSigninDTO {
  email: string;
  password: string;
}
