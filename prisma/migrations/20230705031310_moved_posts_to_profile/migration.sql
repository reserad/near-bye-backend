-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "post_fk";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "post_fk" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
