import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'Your current password should not be less than 6 characters',
    })
    password: string;
}