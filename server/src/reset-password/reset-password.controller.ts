import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from './reset-password.service';
import { PasswordResetDto } from './dto/password-reset.dto';
import { CreatePasswordResetDto } from './dto/create-reset-password.dto';

@Controller('reset-password')
export class PasswordResetController {
    constructor(private readonly passwordResetService: PasswordResetService) { }

    @Post('request')
    createResetDataRecord(@Body() passwordResetDto: CreatePasswordResetDto) {
        const { email } = passwordResetDto;
        return this.passwordResetService.generateResetToken(email);
    }

    @Post('reset')
    resetUserPassword(@Body() passworResetDto: PasswordResetDto) {
        const { token, newPassword } = passworResetDto;
        return this.passwordResetService.resetPassword(token, newPassword);
    }

}
