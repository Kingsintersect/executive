import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { UsersRepository } from './entities/users.repository';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
   constructor(
      private readonly configService: ConfigService,
      private readonly usersRepository: UsersRepository,
      private jwtService: JwtService
   ) { }

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.IsUser(email);
      if (user && bcrypt.compareSync(password, user.password)) {
         const { password, ...result } = user;
         return result;
      }
      throw new UnauthorizedException("user unauthorized");
   }

   async signup(authDto: AuthDto) {
      const { email, password } = authDto;
      authDto.password = await this.generateHash(password);

      try {
         const user_exists = await this.IsUser(email);
         if (user_exists) {
            throw new BadRequestException('User already exists with this Email: ' + email);
         }

         const result = await this.usersRepository.create(authDto);
         delete result.password;

         return result;
      } catch (error) {
         throw new BadRequestException(error);
      }
   }

   signin(user: User, response: Response) {
      const payload = {
         username: user.username,
         email: user.email,
         id: user.id,
         userRole: user.userRole,
         accessLevel: user.accessLevel
      };

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_AUTH_EXPIRATION'),);

      const token = this.jwtService.sign(payload);
      response.cookie('Authentication', token, {
         httpOnly: true,
         expires,
      })

      return {
         access_token: token
      };
   }

   // async validateOAuthLogin(user: any): Promise<string> {
   //    // Handle your user logic here (e.g., checking the database)
   //    // For simplicity, we're just returning a token directly.
   //    return 'fake-jwt-token';
   // }

   async update(filter: any, data: any) {
      const result = await this.usersRepository.update(filter, data);
      if (result.affected = 1) return { success: true }
   }

   signOut(response: Response) {
      response.cookie('Authentication', '', {
         httpOnly: true,
         expires: new Date(),
      })
   }

   async changePassword(user: User, dto: ChangePasswordDto) {
      const { current_password } = dto;
      const old_password = await this.usersRepository.getFields(user.id, ["password"])

      const validPassword = await this.isPasswordMath(current_password, old_password.password)
      if (validPassword) {

         const new_password = await this.generateHash(dto.new_password);
         try {
            const updateUser = await this.update(user.id, { password: new_password });
            return updateUser;
         } catch (err) {
            throw err;
         }
      }
   }



   async generateHash(stringValue: string) {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(stringValue, salt)
      return hashed;
   }

   async isPasswordMath(stringValue: string, hashedValue: string) {
      try {
         const result = await bcrypt.compare(stringValue, hashedValue);
         if (!result) {
            throw new UnauthorizedException(`Passwords didn\'t match!`);
         }
         return true
      } catch (error) {
         throw error;
      }
   }




   // UTILITY METHODS
   async IsUser(email: string) {
      const user = await this.usersRepository.confirmExists({
         where: { email },
      });
      return user || null;
   }
}
