import { VoteType } from './vote-type';

export type VoteDto = {
  type: VoteType;
  postId: string;
};
