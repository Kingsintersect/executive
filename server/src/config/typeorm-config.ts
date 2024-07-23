import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
   const dbType = configService.get<string>('DB_TYPE');

   if (dbType === 'mysql') {
      return {
         type: 'mysql',
         host: configService.get<string>('DB_HOST'),
         port: configService.get<number>('MYSQLDB_PORT'),
         username: configService.get<string>('MYSQLDB_USERNAME'),
         password: configService.get<string>('MYSQLDB_PASSWORD'),
         database: configService.get<string>('DB_NAME'),
         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
         synchronize: true,
      };
   } else if (dbType === 'mongodb') {
      return {
         type: 'mongodb',
         host: configService.get<string>('DB_HOST'),
         port: configService.get<number>('MONGODB_PORT'),
         database: configService.get<string>('DB_NAME'),
         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
         synchronize: true,
         useUnifiedTopology: true,
      };
   } else {
      throw new Error('Unsupported DB_TYPE');
   }
};
