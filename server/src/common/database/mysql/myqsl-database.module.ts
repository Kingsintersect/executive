import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
   imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         useFactory: (configService: ConfigService) => ({
            type: configService.get<string>('DB_TYPE') as 'mysql' | 'mongodb',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [User],
            synchronize: true,
         }),
         inject: [ConfigService],
      }),
   ],
})

export class MysqlDatabaseModule { }