/*
  Warnings:

  - You are about to drop the `UserVote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserVote" DROP CONSTRAINT "UserVote_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserVote" DROP CONSTRAINT "UserVote_voteId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_postId_fkey";

-- DropTable
DROP TABLE "UserVote";

-- DropTable
DROP TABLE "Vote";
