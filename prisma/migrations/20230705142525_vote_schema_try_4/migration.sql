/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "post_fk";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "profile_fk";

-- DropForeignKey
ALTER TABLE "ProfileVote" DROP CONSTRAINT "ProfileVote_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileVote" DROP CONSTRAINT "ProfileVote_voteId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" VARCHAR,
ADD COLUMN     "name" VARCHAR,
ADD COLUMN     "profileImage" VARCHAR;

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "ProfileVote";

-- CreateTable
CREATE TABLE "UserVote" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "voteId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "PostVote_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVote_voteId_key" ON "UserVote"("voteId");

-- CreateIndex
CREATE INDEX "UserVote_voteId_authorId_idx" ON "UserVote"("voteId", "authorId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "post_fk" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
