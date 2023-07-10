import { Prisma } from '@prisma/client';
type QueryPayload = {
  userId: string;
  longitude: number;
  latitude: number;
  radiusInKm?: number;
  limit?: number;
  offset?: number;
};
export const getFeedQuery = ({
  userId,
  latitude,
  longitude,
  radiusInKm = 20,
  limit = 20,
  offset = 0,
}: QueryPayload) => {
  return Prisma.sql`SELECT 
  p.id, 
  p.body, 
  p."createdAt",
  p."authorId",
  v.upvotes,
  v.downvotes,
  CASE WHEN v."userId" = ${userId}::UUID THEN 
    CASE 
      WHEN v.upvoted THEN 'upvoted'
      WHEN v.downvoted THEN 'downvoted'
        ELSE 'neither'
    END
    ELSE 'neither'
  END AS "userVoteStatus",
  u."name" AS "authorName",
  u."profileImage" AS "authorImage",
  COUNT(c."postId") as "commentCount"
  from "Post" p
  left JOIN "User" u ON u."id" = p."authorId"
  inner join (
    select
      vote."userId",
      vote."postId",
      vote.upvoted,
      vote.downvoted,
      count(CASE WHEN vote.upvoted THEN 1 END) AS "upvotes", 
      count(CASE WHEN vote.downvoted THEN 1 END) AS "downvotes"
    from "Vote" vote
    group by vote."userId", vote."postId", vote.upvoted, vote.downvoted
  ) as v on v."postId" = p.id
  left join "Comment" c on c."postId" = p.id
  WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radiusInKm})
  GROUP BY p.id, v."userId", u."name", u."profileImage", v.upvoted, v.downvoted, p.body, p."createdAt", c."postId", v.upvotes, v.downvotes
  ORDER BY p."createdAt" DESC
  LIMIT ${limit}
  OFFSET ${offset}`;
};
