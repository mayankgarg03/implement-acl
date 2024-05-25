import { IsString, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from 'src/modules/acl/entities/role.entity';

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
