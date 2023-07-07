/*
  Warnings:

  - You are about to drop the column `authorId` on the `Vote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_post_FK";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_profile_FK";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "authorId";

-- CreateTable
CREATE TABLE "PostVote" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "voteId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "PostVote_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostVote_voteId_authorId_idx" ON "PostVote"("voteId", "authorId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVote" ADD CONSTRAINT "PostVote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVote" ADD CONSTRAINT "PostVote_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
