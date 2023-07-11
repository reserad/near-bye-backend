import { Post } from '@prisma/client';
import { VoteStatus } from './vote-status';

export type UserPost = Post & {
  userVoteStatus: VoteStatus;
  score: number;
};
