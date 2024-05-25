import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDTO } from '../dto/register.dto';
import { RegisterService } from '../register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async register(@Body() body: RegisterDTO) {
    try {
      const createdUser = await this.registerService.createUser(body);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}
