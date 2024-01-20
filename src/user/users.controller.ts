import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
//import { EmailValidationPipe } from '../pipe/email-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { EmailValidationPipe } from '../pipe/email-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(EmailValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
