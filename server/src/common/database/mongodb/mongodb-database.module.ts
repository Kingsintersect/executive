import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<string>('DB_TYPE') as 'mysql' | 'mongodb',
                url: configService.get<string>('DB_URI'),
                useNewUrlParser: true,
                useUnifiedTopology: true,

                entities: [User, Product],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})


export class MongodbDatabaseModule { }