import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialDto: AuthCredentialDto) {
    const { email, password } = authCredentialDto;
    const user = await this.userService.findUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Incorrect Credentials');
    }
  }

  async signUp(authCredentialDto: AuthCredentialDto) {
    const { email } = authCredentialDto;
    if (await this.prisma.user.count({ where: { email: email } })) {
      throw new ConflictException('email already taken');
    }
    return this.prisma.user.create({ data: authCredentialDto });
  }
}
