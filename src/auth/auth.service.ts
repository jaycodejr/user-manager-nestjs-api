import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { SignInDto } from './dto/signin.dto';

import * as bcrypt from 'bcrypt';
import { TokenDto } from './dto/token.dto';
import { JwtPayload } from './jwt.payload';
import { User } from '../user/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<TokenDto> {
    const { email, password } = signInDto;
    const user = await this.usersService.getUserByEmail(email);

    if (!(await this.verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
    };
    const token = await this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const { email } = jwtPayload;
    return await this.usersService.getUserByEmail(email);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  }
}
