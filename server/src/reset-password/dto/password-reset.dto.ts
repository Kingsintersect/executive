import { IsString, IsNotEmpty } from "class-validator";

export class PasswordResetDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}