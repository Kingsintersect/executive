import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
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
                        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                        synchronize: true,
                        autoLoadEntities: true, // ADDED FROM DOCUMENTATION BY ME
                    }),
                    inject: [ConfigService],
                }),
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => ({
                        uri: configService.get<string>('MONGO_URI'),
                    }),
                    inject: [ConfigService],
                }),
            ],
        };
    }
}
