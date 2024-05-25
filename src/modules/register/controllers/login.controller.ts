import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO } from '../dto/register.dto';
import { RegisterService } from '../register.service';

@Controller('login')
export class LoginController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async login(@Body() body: LoginDTO) {
    const user = await this.registerService.loginUser(body);
    return user;
  }
}
