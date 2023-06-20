import { user } from '@prisma/client';
import { User } from '../types/user.type';

export const mapPrismaUser = (user: user): User => {
  return {
    id: user.id,
    phoneNumber: user.phone_number,
    baseLatitude: user.base_latitude ? user.base_latitude.toNumber() : null,
    baseLongitude: user.base_longitude ? user.base_longitude.toNumber() : null,
    createdAt: user.created_at,
  };
};
