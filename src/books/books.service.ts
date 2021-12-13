import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  getBooks() {
    return this.prisma.book.findMany();
  }

  getBookById(id: string) {
    const book = this.prisma.book.findUnique({ where: { id: id } });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  createBook(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }
}
