export interface IUser {
  // do u need this if already have model def?
  participantId: string;
  name: string;
  email: string;
  password: string;
  age: number;
  sex: string;
}

export interface IUserInputDTO {
  // this makes sense cuz it's the "user" b4 registering
  name: string;
  email: string;
  password: string;
}
