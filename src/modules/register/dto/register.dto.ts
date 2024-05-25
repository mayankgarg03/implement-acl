import { IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  role: string;
}

export class LoginDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  accessToken?: string;
}
