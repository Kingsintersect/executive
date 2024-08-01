import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm-config';
import { initializeGlobalConfig } from './config/global-config';
import { AuthModule } from './auth/auth.module';
import { PasswordResetModule } from './reset-password/reset-password.module';
import { UsersProfileModule } from './users-profile/users-profile.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
        PORT: Joi.number().default(4040),
        DB_TYPE: Joi.string().valid('mysql', 'mongodb').required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string().allow(''), // allowed for empty password; .default('password'),
        DB_NAME: Joi.string().default('test'),
        DB_URI: Joi.string().optional(),

        JWT_SECRET: Joi.string().required(),
        JWT_AUTH_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_AUTH_EXPIRATION', 3600)}s`,
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        initializeGlobalConfig(configService);
        return await getTypeOrmConfig(configService)
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersProfileModule,
    PasswordResetModule,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    initializeGlobalConfig(this.configService); // Ensure global config is initialized
  }
}
