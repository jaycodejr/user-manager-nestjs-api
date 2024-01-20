import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from '../enum/user-status.enum';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.findOne({ where: { id } });

    if (found) {
      return found;
    }
    throw new NotFoundException(`User with ID='${id} does not exist'`);
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.findOne({ where: { email } });

    if (found) {
      return found;
    }
    throw new NotFoundException(`User with Email='${email} does not exist'`);
  }

  async getUsers(): Promise<User[]> {
    return await this.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { fullname, email, password } = createUserDto;
    try {
      //user should select from front end
      const hashedPassword = await this.createHashedPassword(password);
      const user = await this.create({
        fullname,
        email,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
      });

      await this.save(user);

      return user;
    } catch (error) {
      if (error.number === 2627) {
        throw new ConflictException(`User email '${email}' already exist`);
      } else {
        throw new InternalServerErrorException(`Failed to create user`);
      }
    }
  }

  async createHashedPassword(password: string): Promise<string> {
    const saltRound = 10;
    const saltString = await bcrypt.genSalt(saltRound);

    const hashedPassword = await bcrypt.hash(password, saltString);

    return hashedPassword;
  }
}
