import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../../app/core/database/prisma/prisma.service";
import { IService } from "../../../../app/core/interfaces/service.interface";

@Injectable()
export class FindAllUserService implements IService{
    constructor(private readonly _prisma:PrismaService){}
    async execute() {
        try {
            return this._prisma.user.findMany();
        } catch (error) {
            console.log(error);
            throw Error(error)
        }
    }
}