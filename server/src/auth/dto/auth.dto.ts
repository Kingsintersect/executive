import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../../shared/types/generic.types";

export class AuthDto {
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsString()
   @IsNotEmpty()
   username: string;


   @IsString()
   @IsNotEmpty()
   @MinLength(6, {
      message: 'password must not be less than 6 characters',
   })
   password: string;

   @IsEnum(UserRole)
   @IsOptional()
   @Transform(({ value }) => value ? value : UserRole.USER, { toClassOnly: true })  // Set default value
   userRole?: UserRole;

   @IsDate()
   @IsOptional()
   @Transform(({ value }) => value ? new Date(value) : new Date(), { toClassOnly: true })
   createdAt: Date;

}