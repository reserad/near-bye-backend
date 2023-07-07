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
};

export enum VoteStatus {
  UPVOTED = 'upvoted',
  DOWNVOTED = 'downvoted',
  NEITHER = 'neither',
}