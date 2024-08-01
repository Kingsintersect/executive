import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './entities/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule } from '@nestjs/config';
// import Joi from 'joi';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   JWT_SECRET: Joi.string().required(),
      //   JWT_AUTH_EXPIRATION: Joi.string().required(),
      // }),
      // envFilePath: './.env',
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
