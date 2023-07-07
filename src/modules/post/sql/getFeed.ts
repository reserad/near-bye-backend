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
  body, 
  p."createdAt", 
  count(CASE WHEN v.upvoted THEN 1 END) AS "upvotes", 
  count(CASE WHEN v.downvoted THEN 1 END) AS "downvotes",
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
  p."authorId"
FROM "Post" p 
INNER JOIN "Vote" v ON v."postId" = p.id 
INNER JOIN "User" u ON u."id" = p."authorId"
WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radiusInKm})
GROUP BY p.id, v.upvoted, v.downvoted, v."userId", u."name", u."profileImage"
ORDER BY p."createdAt" DESC
LIMIT ${limit}
OFFSET ${offset}`;
};
