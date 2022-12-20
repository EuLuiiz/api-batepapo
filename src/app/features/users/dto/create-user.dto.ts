import { Prisma } from "@prisma/client";
import { IsString, IsEmail, IsOptional, IsNotEmpty } from "class-validator";
import { User } from "../interfaces/user.entity";

export class CreateUserDto extends User {
    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    profileImage?: string;

    @IsString()
    @IsOptional()
    photos?: Prisma.PhotoCreateNestedManyWithoutUserInput;
}