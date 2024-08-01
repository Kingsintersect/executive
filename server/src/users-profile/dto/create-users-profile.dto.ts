import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateUsersProfileDto {
   @IsString()
   @IsNotEmpty()
   firstName: string;

   @IsString()
   @IsNotEmpty()
   lastName: string;

   @IsNumber()
   @IsNotEmpty()
   userId: number;

   @IsString()
   @IsOptional()
   middleName?: string;

   @IsString()
   @IsOptional()
   pictureRef?: string;

   @IsString()
   @IsOptional()
   contry?: string;

   @IsString()
   @IsOptional()
   state?: string;

   @IsPhoneNumber()
   @IsOptional()
   phonNumber?: number;

   @IsString()
   @IsOptional()
   address?: string;


   @IsString()
   @IsOptional()
   @MaxLength(250, {
      message: 'Bio data cannot be more that 250 charaters!',
   })
   bio?: string;

   @IsDate()
   @IsOptional()
   @Transform(({ value }) => value ? new Date(value) : new Date(), { toClassOnly: true })
   updatedAt?: Date;
}