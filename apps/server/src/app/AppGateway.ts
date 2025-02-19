import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS if needed
export class AppGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server | undefined;

  onModuleInit() {
    this.server?.on('connection', (socket: Socket) => {
      console.log('connected');
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { sender: string; text: string }) {
    console.log(`Message from ${payload.sender}: ${payload.text}`);
    this.server?.emit('message', payload); // Broadcast message to all clients
  }
}
