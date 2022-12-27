import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/core/database/prisma/prisma.service';
import { ChatGateway } from './gateway/chat.gateway';
import { HandleMessageChatService } from './services/handleMessage.chat.service';

@Module({
  controllers: [],
  providers: [ChatGateway, HandleMessageChatService, PrismaService]
})

export class ChatModule { }