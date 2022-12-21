import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../../app/core/database/prisma/prisma.service";
import { IService } from "../../../../app/core/interfaces/service.interface";

@Injectable()
export class DeleteUserService implements IService {
    constructor(private readonly _prisma: PrismaService) { }
    async execute(id: number) {
        try {
            const user = await this._prisma.user.findUnique({ where: { id } })
            if (!user) {
                throw Error(`Usuário de ID: '${id}' não existe.`)
            }

            return this._prisma.user.delete({ where: { id } });
        } catch (error) {
            console.log(error);
            throw Error(error)
        }
    }
}