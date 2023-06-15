import { Module } from '@nestjs/common';
import { GeographyService } from './geography-service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Module({
  providers: [GeographyService, PrismaService],
  exports: [GeographyService],
})
export class GeographyModule {}
