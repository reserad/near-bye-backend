-- CreateTable
CREATE TABLE "token" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token" VARCHAR NOT NULL,
    "expires_at" VARCHAR NOT NULL,
    "created_at" VARCHAR NOT NULL,
    "updated_at" VARCHAR NOT NULL,

    CONSTRAINT "token_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
