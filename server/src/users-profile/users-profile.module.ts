import { Module } from '@nestjs/common';
import { UsersProfileService } from './users-profile.service';
import { UsersProfileController } from './users-profile.controller';
import { ProfileRepository } from './entities/profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProfile } from './entities/users-profile.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersProfile]),
    SharedModule,
  ],
  controllers: [UsersProfileController],
  providers: [
    UsersProfileService,
    ProfileRepository,
  ],
})
export class UsersProfileModule { }
