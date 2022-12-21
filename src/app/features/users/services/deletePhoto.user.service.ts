import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../core/database/prisma/prisma.service";
import { IService } from "../../../core/interfaces/service.interface";

@Injectable()
export class DeletePhotoUserService implements IService {
    constructor(private readonly _prisma: PrismaService) { }
    async execute(userId: number, photoId: number) {
        try {
            const user = await this._prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                throw Error(`Usuário de ID: '${userId}' não existe.`);
            }
            const image = await this._prisma.photo.findUnique({ where: { id: photoId } });
            if (!image) {
                throw Error(`Image de ID: '${photoId}' não existe.`);
            }
            if (image.userId !== userId) {
                throw Error(`A imagem de ID: '${photoId}' não pertence a nenhum usuário de ID: '${userId}'`);
            }
            return this._prisma.photo.delete({ where: { id: photoId } });
        } catch (error) {
            console.log(error);
            throw Error(error)
        }
    }
}