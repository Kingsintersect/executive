import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, Repository as TypeORMRepository } from 'typeorm';
import { Model, Document } from 'mongoose';
import { MySQLBaseRepository } from './mysql-base.repository';
import { MongoBaseRepository } from './mongo-base.repository';
// import { UserRepository } from './user.repository'; // Concrete implementation for MySQL
// import { UserMongoRepository } from './user.mongo.repository'; // Concrete implementation for MongoDB

type EntityWithId = { id: number };

export const createRepositoryProvider = <T extends EntityWithId>(
    entityClass: new () => T,
    mongoModel: Model<T & Document>,
    mysqlRepository: new (repo: TypeORMRepository<T>) => MySQLBaseRepository<T>,
    mongoRepository: new (model: Model<T & Document>) => MongoBaseRepository<T & Document>,
): Provider => ({
    provide: `${entityClass.name}Repository`,
    useFactory: (configService: ConfigService, connection: Connection) => {
        const dbType = configService.get<string>('DB_TYPE');
        if (dbType === 'mysql') {
            return new mysqlRepository(connection.getRepository(entityClass));
        }
        return new mongoRepository(mongoModel);
    },
    inject: [ConfigService, Connection],
});

















// src/common/repository.provider.ts
// import { Provider } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Connection } from 'typeorm';
// import { Model } from 'mongoose';
// import { MySQLBaseRepository } from './mysql-base.repository';
// import { MongoBaseRepository } from './mongo-base.repository';

// export const createRepositoryProvider = <T>(
//     entityClass: new () => T,
//     mongoModel: Model<T>,
// ): Provider => ({
//     provide: `${entityClass.name}Repository`,
//     useFactory: (configService: ConfigService, connection: Connection) => {
//         const dbType = configService.get<string>('DB_TYPE');
//         if (dbType === 'mysql') {
//             return new MySQLBaseRepository<T>(connection.getRepository(entityClass));
//         }
//         return new MongoBaseRepository<T>(mongoModel);
//     },
//     inject: [ConfigService, Connection],
// });
