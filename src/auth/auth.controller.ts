import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto) {
    const salt = await bcrypt.genSalt();
    authCredentialDto.password = await bcrypt.hash(
      authCredentialDto.password,
      salt,
    );
    return this.authService.signUp(authCredentialDto);
  }
}
