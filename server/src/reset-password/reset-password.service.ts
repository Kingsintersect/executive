import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordResetService {

    constructor(
        private configService: ConfigService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    async generateResetToken(email: string) {
        const user = await this.validateUser(email);

        const payload = { email: user.email, id: user.id };
        const secret = this.configService.get<string>('JWT_SECRET');
        const expiresIn = this.configService.get<number>('JWT_RESET_PASSWORD_EXPIRATION');

        const token = this.jwtService.sign(payload, {
            secret,
            expiresIn: `${expiresIn}s`,
        });
        return { token }
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const secret = this.configService.get<string>('JWT_SECRET');

            const payload = this.jwtService.verify(token, {
                secret,
            });

            const hashedPassword = await this.authService.generateHash(newPassword);
            const result = await this.authService.update(payload.id, { password: hashedPassword })
            if (result.success) return { message: "your password has been updated successfully!" };

        } catch (error) {
            if (error.name === 'TokenExpiredError') throw new UnauthorizedException('The reset password token has expired.');
            if (error.status === 404) throw new BadRequestException("User was not found")
            throw new UnauthorizedException('Invalid token.');
        }
    }

    async validateUser(email: string) {
        try {
            const user = await this.authService.IsUser(email);
            if (!user) {
                throw new BadRequestException(`User with this email ${email} could not be found!`);
            }
            return user
        } catch (error) {
            throw error;
        }
    }

}
