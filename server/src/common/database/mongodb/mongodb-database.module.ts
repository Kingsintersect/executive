// import { Module } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { MongooseModule } from "@nestjs/mongoose";

// @Module({
//     imports: [
//         MongooseModule.forRootAsync({
//             useFactory: (configService: ConfigService) => ({
//                 uri: configService.get<string>('MONGO_URI'),
//             }),
//             inject: [ConfigService],
//         }),
//     ],
// })

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

                // mysql
                // host: configService.get<string>('DB_HOST'),
                // port: configService.get<number>('DB_PORT'),
                // username: configService.get<string>('DB_USERNAME'),
                // password: configService.get<string>('DB_PASSWORD'),
                // database: configService.get<string>('DB_NAME'),

                // mongodb
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