import { Module } from '@nestjs/common';
import { ProfileService } from './users-profile.service';
import { ProfileController } from './users-profile.controller';
import { ProfileRepository } from './entities/profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/users-profile.entity';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    SharedModule,
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
  ],
})
export class UsersProfileModule { }
