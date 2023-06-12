CREATE EXTENSION postgis;

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR NOT NULL,
    "body" VARCHAR NOT NULL,
    "created_at" VARCHAR NOT NULL,
    "user_id" UUID NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "user_id" UUID NOT NULL,
    "profile_image" VARCHAR,
    "bio" VARCHAR,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "profile_pk" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "phone_number" VARCHAR NOT NULL,
    "base_lattitude" DECIMAL NOT NULL,
    "base_longitude" DECIMAL NOT NULL,
    "created_at" VARCHAR NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
