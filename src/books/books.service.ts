import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  getBooks() {
    return this.prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getBookById(id: string) {
    const book = this.prisma.book.findUnique({ where: { id: id } });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  createBook(createBookDto: CreateBookDto, user: User) {
    if (user.userType === 'MANAGER') {
      return this.prisma.book.create({ data: createBookDto });
    } else {
      throw new UnauthorizedException('You Are Not Manager');
    }
  }

  updateBook(id: string, updateBookDto: UpdateBookDto, user: User) {
    if (user.userType === 'MANAGER') {
      return this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } else {
      throw new UnauthorizedException('You Are Not Manager');
    }
  }
}
