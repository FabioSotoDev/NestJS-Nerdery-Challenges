import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [PrismaModule, BooksModule, AuthModule, UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
