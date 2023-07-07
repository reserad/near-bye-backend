-- CreateTable
CREATE TABLE "Vote" (
    "id" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "upvoted" BOOLEAN NOT NULL,
    "downvoted" BOOLEAN NOT NULL,

    CONSTRAINT "Vote_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_post_FK" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_profile_FK" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
