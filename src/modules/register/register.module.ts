import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './register.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './controllers/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../acl/entities/role.entity';
import { AclModule } from '../acl/acl.module';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), AclModule],
  exports: [RegisterService],
  providers: [RegisterService],
  controllers: [RegisterController, LoginController],
})
export class RegisterModule {}
