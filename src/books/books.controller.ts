import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../users/get-user.decorator';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Post()
  @UseGuards(AuthGuard())
  createBook(@Body() createBookDto: CreateBookDto, @GetUser() user: User) {
    return this.booksService.createBook(createBookDto, user);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @GetUser() user: User,
  ) {
    return this.booksService.updateBook(id, updateBookDto, user);
  }

  @Post('/:id/like')
  @UseGuards(AuthGuard())
  likeBook(@Param('id') id: string, @GetUser() user: User) {
    return this.booksService.likeBook(id, user);
  }
}
