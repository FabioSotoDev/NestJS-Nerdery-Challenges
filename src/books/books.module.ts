import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [PrismaService, BooksService],
})
export class BooksModule {}
