/*
  Warnings:

  - You are about to drop the `PostVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostVote" DROP CONSTRAINT "PostVote_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostVote" DROP CONSTRAINT "PostVote_voteId_fkey";

-- DropTable
DROP TABLE "PostVote";

-- CreateTable
CREATE TABLE "ProfileVote" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "voteId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "PostVote_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileVote_voteId_key" ON "ProfileVote"("voteId");

-- CreateIndex
CREATE INDEX "ProfileVote_voteId_authorId_idx" ON "ProfileVote"("voteId", "authorId");

-- AddForeignKey
ALTER TABLE "ProfileVote" ADD CONSTRAINT "ProfileVote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileVote" ADD CONSTRAINT "ProfileVote_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
