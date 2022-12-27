import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private readonly _logger: Logger = new Logger('Chat Gateway')

    @SubscribeMessage('Message to server')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('Message to client', payload, client.id)
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