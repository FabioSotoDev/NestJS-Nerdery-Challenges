import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'token';
    } else {
      throw new UnauthorizedException('Incorrect Credentials');
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;
    if (await this.prisma.user.count({ where: { email: email } })) {
      throw new ConflictException('email already taken');
    }
    return this.prisma.user.create({ data: signUpDto });
  }
}
