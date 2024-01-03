/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderd-books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews-and-ratings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "orderd-books" DROP CONSTRAINT "orderd-books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "orderd-books" DROP CONSTRAINT "orderd-books_orderId_fkey";

-- DropForeignKey
ALTER TABLE "reviews-and-ratings" DROP CONSTRAINT "reviews-and-ratings_bookId_fkey";

-- DropForeignKey
ALTER TABLE "reviews-and-ratings" DROP CONSTRAINT "reviews-and-ratings_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "name",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "orderd-books";

-- DropTable
DROP TABLE "reviews-and-ratings";

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "block" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "order_number" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_time" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "order_details" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "delivery_fee" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
