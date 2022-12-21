import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../../app/core/database/prisma/prisma.service";
import { IService } from "../../../../app/core/interfaces/service.interface";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserService implements IService {
    constructor(private readonly _prisma: PrismaService) { }
    async execute(id: number, data: UpdateUserDto) {
        try {
            const user = await this._prisma.user.findUnique({ where: { id } })
            if (!user) {
                throw Error(`Usuário de ID: '${id}' não existe.`)
            }
            return await this._prisma.user.update({
                where: { id },
                data
            });
        } catch (error) {
            console.log(error);
            throw Error(error)
        }
    }
}