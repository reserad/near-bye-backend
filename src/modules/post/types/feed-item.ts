import { VoteStatus } from './vote-status';

export type FeedItem = {
  id: string;
  body: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVoteStatus: VoteStatus;
  authorName: string;
  authorImage: string;
  auhtorId: string;
  commentCount: number;
};
