import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../dto/register.dto';
import { RegisterService } from '../register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async register(@Body() body: RegisterDTO) {
    console.log('at register controller ', body);
    const createdUser = await this.registerService.createUser(body);
    return createdUser;
  }
}
