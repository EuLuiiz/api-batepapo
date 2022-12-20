import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/core/database/prisma/prisma.service';
import { hashPassword } from 'src/app/core/services/password/hashPassword';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    const user = await this._prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
      throw Error("E-mail informado já cadastrado no sistema");
    }
    data.password = await hashPassword(data.password)
    return await this._prisma.user.create({ data });
  }

  async findAll() {
    return this._prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this._prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw Error(`Usuário de ID: '${id}' não existe.`)
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this._prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw Error(`Usuário de ID: '${id}' não existe.`)
    }
    return await this._prisma.user.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    const user = await this._prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw Error(`Usuário de ID: '${id}' não existe.`)
    }
    return this._prisma.user.delete({ where: { id } });
  }
}
