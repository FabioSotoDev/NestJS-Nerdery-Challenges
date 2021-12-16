import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/manager')
  makeManager(@Body() emailBody) {
    const { email } = emailBody;
    return this.usersService.makeManager(email);
  }
}
