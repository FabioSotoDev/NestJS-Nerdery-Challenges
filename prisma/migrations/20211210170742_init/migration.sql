/*
  Warnings:

  - You are about to alter the column `price` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.
  - You are about to alter the column `price` on the `order_books` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.
  - You are about to alter the column `total_price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "order_books" ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(12,2);
