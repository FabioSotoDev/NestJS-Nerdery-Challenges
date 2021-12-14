import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, BooksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
