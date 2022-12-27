import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { PrismaService } from "../../../../app/core/database/prisma/prisma.service";
import { IService } from "../../../../app/core/interfaces/service.interface";
import { Server, Socket } from 'socket.io';
import { WordDTO } from '../dto/word.dto';

@Injectable()
export class HandleMessageChatService implements IService {
    @WebSocketServer() server: Server;
    constructor(private readonly _prisma: PrismaService) { }
    async execute(client: Socket, payload: string) {
        try {
            const listWords = await this._prisma.forbidden_words.find();
            const prohibitedWords = listWords.map(obj => obj.word)
            if (prohibitedWords.some(word => payload.includes(word))) {
                this.server.emit('Message to client', 'Sorry, that message contains prohibited language.', client.id);
                return;
            }
            this.server.emit('Message to client', payload, client.id);
        } catch (error) {
            console.log(error);
            throw Error(error)
        }
    }
}