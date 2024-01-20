import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { SignInDto } from './dto/signin.dto';
import { EmailValidationPipe } from '../pipe/email-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(EmailValidationPipe)
  signIn(@Body() signInDto: SignInDto): Promise<TokenDto> {
    return this.authService.signIn(signInDto);
  }
}
