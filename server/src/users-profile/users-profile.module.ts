import { Module } from '@nestjs/common';
import { UsersProfileService } from './users-profile.service';
import { UsersProfileController } from './users-profile.controller';
import { ProfileRepository } from './entities/profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProfile } from './entities/users-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersProfile])],
  controllers: [UsersProfileController],
  providers: [UsersProfileService, ProfileRepository],
})
export class UsersProfileModule { }
