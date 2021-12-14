import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [AuthModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
