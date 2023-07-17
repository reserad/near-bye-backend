import { Prisma } from '@prisma/client';
type QueryPayload = {
  longitude: number;
  latitude: number;
  radiusInKm?: number;
  take?: number;
  offset?: number;
};
export const getPostsInProximity = ({
  latitude,
  longitude,
  radiusInKm = 20,
  take = 20,
  offset = 0,
}: QueryPayload) => {
  const radiusInMeters = radiusInKm * 1000;
  return Prisma.sql`
  SELECT 
    p.id
  FROM "Post" p
  WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radiusInMeters})
  ORDER BY p."createdAt" DESC
  LIMIT ${take}
  OFFSET ${offset}`;
};
