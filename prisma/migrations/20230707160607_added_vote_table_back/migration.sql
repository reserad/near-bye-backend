-- CreateTable
CREATE TABLE "Vote" (
    "postId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "upvoted" BOOLEAN DEFAULT true,
    "downvoted" BOOLEAN DEFAULT false,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
