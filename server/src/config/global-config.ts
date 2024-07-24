// import { registerAs } from '@nestjs/config';

// export default registerAs('app', () => ({
//    dbType: process.env.DB_TYPE,
// }));

import { ConfigService } from '@nestjs/config';

// This function will initialize the global configuration
export function initializeGlobalConfig(configService: ConfigService): void {
   global.dbType = configService.get<string>('DB_TYPE');
}
