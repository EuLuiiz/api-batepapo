import { Logger, NotFoundException } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { HandleMessageChatService } from "../services/handleMessage.chat.service";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private readonly _logger: Logger = new Logger('Chat Gateway')
    private readonly _handleMessageService: HandleMessageChatService

    @SubscribeMessage('Message_to_server')
    async handleMessage(client: Socket, payload: string): Promise<void> {
        return await this._handleMessageService.execute(client, payload).catch((error) => {
            throw new NotFoundException(error.message)
        });
    }

    afterInit(server: Server) {
        this._logger.log('Chat service init...')
    }

    handleConnection(client: Socket) {
        this._logger.log(`Client ID: '${client.id}' connected.`)
    }

    handleDisconnect(client: Socket) {
        this._logger.log(`Client ID: '${client.id}' disconnected.`)
    }
}