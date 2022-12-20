import { Prisma } from "@prisma/client";

export class User implements Prisma.UserUncheckedCreateInput {
    id?: number;
    nickname: string;
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
    photos?: Prisma.PhotoUncheckedCreateNestedManyWithoutUserInput;
    createdAt?: string | Date;
    ChatHistory?: Prisma.ChatHistoryUncheckedCreateNestedManyWithoutUserInput;
}
