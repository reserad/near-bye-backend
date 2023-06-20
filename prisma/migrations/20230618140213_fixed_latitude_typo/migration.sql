/*
  Warnings:

  - You are about to drop the column `base_lattitude` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "base_lattitude",
ADD COLUMN     "base_latitude" DECIMAL;
