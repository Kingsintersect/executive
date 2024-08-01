import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
   constructor(private configService: ConfigService) { }

   get authExpiration(): number {
      return this.configService.get<number>('JWT_AUTH_EXPIRATION', 3600);
   }

   get resetPasswordExpiration(): number {
      return this.configService.get<number>('JWT_RESET_PASSWORD_EXPIRATION', 900);
   }

   get secret(): string {
      return this.configService.get<string>('JWT_SECRET');
   }
}
