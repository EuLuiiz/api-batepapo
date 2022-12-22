import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginRequestBody {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
}