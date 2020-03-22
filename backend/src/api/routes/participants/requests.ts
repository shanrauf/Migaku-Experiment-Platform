import { Expose } from 'class-transformer';
import {
  IsString,
  IsDefined,
  IsEmail,
  IsOptional,
  IsISO8601
} from 'class-validator';

export class ParticipantSignup {
  @Expose()
  @IsOptional()
  @IsString()
  participantId?: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsString()
  discordUsername?: string;

  @Expose()
  @IsISO8601()
  lastLogin?: Date;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsDefined()
  age!: number;

  @Expose()
  @IsString()
  sex!: string;
}

export class ParticipantFilters {
  @Expose()
  @IsOptional()
  @IsString()
  participantId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  experimentId?: string;
}
