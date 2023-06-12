import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GeographyService } from './geography-service';

@Module({
  providers: [GeographyService, PrismaService],
  exports: [GeographyService],
})
export class GeographyModule {}
