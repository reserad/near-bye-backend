import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GeographyService {
  constructor(private prisma: PrismaService) {}
  getPostsWithinProximity = async (longitude: number, latitude: number) => {
    const radiusInKm = 20 * 1000;
    return await this.prisma.$queryRaw<
      { id: string }[]
    >`SELECT id FROM "Post" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radiusInKm})`;
  };
}
