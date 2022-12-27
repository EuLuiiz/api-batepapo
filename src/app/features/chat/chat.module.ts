import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  controllers: [],
  providers: [ChatGateway]
})

export class ChatModule { }