import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async createUser(@Body() body: { firstName: string; lastName: string }) {
    const { firstName, lastName } = body;
    return this.userService.createUser(firstName, lastName);
  }

  @Post()
  async getAll() {
    return 'successful';
  }
}
