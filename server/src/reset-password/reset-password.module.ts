import { Module } from '@nestjs/common';
import { PasswordResetService } from './reset-password.service';
import { PasswordResetController } from './reset-password.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule { }
