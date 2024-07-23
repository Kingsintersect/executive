import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './common/database/database.module';
import * as Joi from 'joi';

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
      }),
      envFilePath: '.env',
    }),
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule { }
