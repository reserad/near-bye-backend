import { Post, Profile, User } from '@prisma/client';

export type PostResponse = Post & {
  author: User & {
    profile: Profile;
  };
};
