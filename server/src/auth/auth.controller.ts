import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  signin(@Request() req: any, @Res() response: Response) {
    const result = this.authService.signin(req.user, response);
    response.send(result); // when using @Res you need to manually send back the response!!!
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user, changePasswordDto);
  }

}
