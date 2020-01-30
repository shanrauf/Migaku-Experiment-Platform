import { Expose } from "class-transformer";

export class BaseResponse {
  @Expose()
  public message?: string;

  @Expose()
  public errors: Array<string> = [];
}
