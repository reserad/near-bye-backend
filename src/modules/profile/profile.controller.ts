import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('posts')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
}
