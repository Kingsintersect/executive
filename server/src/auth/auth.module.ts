import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './entities/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../shared/strategy/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../shared/strategy/jwt.strategy';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
