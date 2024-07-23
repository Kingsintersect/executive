import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/user.module';
import * as Joi from 'joi';
// import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm-config';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => await getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),
    // ProductsModule,
  ],
})
export class AppModule { }
