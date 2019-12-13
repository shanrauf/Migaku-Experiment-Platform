export interface IUser {
  // do u need this if already have model def?
  participantId: string;
  name: string;
  email: string;
  password: string;
  age: number;
  sex: string;
  lastLogin: Date;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  age: number;
  sex: string;
}
