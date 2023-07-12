import { Post, Vote } from '@prisma/client';
import { VoteStatus } from '../types/vote-status';

export const buildUserPost = (
  post: Post & { votes: Vote[] },
  userId: string,
) => {
  const userVote = post.votes.find(vote => vote.userId === userId);
  let userVoteStatus = VoteStatus.NEITHER;
  if (userVote) {
    if (userVote.upvoted) {
      userVoteStatus = VoteStatus.UPVOTED;
    } else if (userVote.downvoted) {
      userVoteStatus = VoteStatus.DOWNVOTED;
    }
  }
  const upvotes = post.votes.filter(vote => vote.upvoted).length;
  const downvotes = post.votes.filter(vote => vote.downvoted).length;
  return { ...post, userVoteStatus, score: upvotes - downvotes };
};
