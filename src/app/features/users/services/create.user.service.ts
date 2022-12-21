import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../app/core/database/prisma/prisma.service';
import { hashPassword } from '../../../../app/core/services/password/hashPassword';
import { CreateUserDto } from '../dto/create-user.dto';
import { IService } from '../../../core/interfaces/service.interface';

@Injectable()
export class CreateUserService implements IService {
    constructor(private readonly _prisma: PrismaService){}

    async execute(data: CreateUserDto) {
        try {
            const user = await this._prisma.user.findUnique({ where: { email: data.email } });
            if (user) {
                throw Error("E-mail informado já cadastrado no sistema");
            }
            data.password = await hashPassword(data.password)
            return await this._prisma.user.create({ data });
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
}