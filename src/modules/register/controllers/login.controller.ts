import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO } from '../dto/register.dto';
import { RegisterService } from '../register.service';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async login(@Body() body: LoginDTO) {
    console.log('at login controller ', body);
    const user = await this.registerService.loginUser(body);
    return user;
  }
}