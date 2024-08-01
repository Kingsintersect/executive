import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'Your current password should not be less than 6 characters',
    })
    current_password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'new password must not be less than 6 characters',
    })
    new_password: string;
}