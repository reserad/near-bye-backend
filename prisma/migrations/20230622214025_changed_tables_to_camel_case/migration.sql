/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_fk";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_fk";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_fk";

-- DropTable
DROP TABLE "post";

-- DropTable
DROP TABLE "profile";

-- DropTable
DROP TABLE "token";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR NOT NULL,
    "body" VARCHAR NOT NULL,
    "createdAt" VARCHAR NOT NULL,
    "userId" UUID NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" UUID NOT NULL,
    "profileImage" VARCHAR,
    "bio" VARCHAR,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "profile_pk" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "token" VARCHAR NOT NULL,
    "expiresAt" VARCHAR NOT NULL,
    "createdAt" VARCHAR NOT NULL,
    "updatedAt" VARCHAR NOT NULL,

    CONSTRAINT "token_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "phoneNumber" VARCHAR NOT NULL,
    "baseLongitude" DECIMAL,
    "createdAt" VARCHAR NOT NULL,
    "baseLatitude" DECIMAL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_un" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "post_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "profile_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "token_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
