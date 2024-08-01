import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreatePasswordResetDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
