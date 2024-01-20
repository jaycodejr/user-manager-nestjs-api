import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepo.getUsers();
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepo.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepo.getUserByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepo.createUser(createUserDto);
  }
}
