import { Prisma } from "@prisma/client";
import { IsString, IsEmail, IsOptional, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";
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
    @MinLength(6)
    @MaxLength(21)
    //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;

    @IsString()
    @IsOptional()
    profileImage?: string;

    @IsString()
    @IsOptional()
    photos?: Prisma.PhotoCreateNestedManyWithoutUserInput;
}