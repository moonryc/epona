import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, Inject, OnModuleDestroy } from '@nestjs/common';
import { EponaService } from './epona.service';
import { ChatDto } from './epona.input';
import { EponaSingleton } from './epona.singleton';

@WebSocketGateway({ 
  cors: { origin: '*' },
  namespace: '/epona'
})
export class EponaGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleDestroy {
  private broadcastInterval: NodeJS.Timeout;

  constructor(
    @Inject(EponaService) private readonly eponaService: EponaService,
    @Inject('EPONA_SINGLETON') private readonly eponaSingleton: EponaSingleton,
  ) {}

  @WebSocketServer()
  server: Server | undefined;

  onModuleInit() {
    this.server?.on('connection', (socket: Socket) => {
      console.log(`Epona socket id: ${socket.id} connected`);
    });
    
    this.setupBroadcastInterval();
  }

  private setupBroadcastInterval() {
    const intervalSeconds = 30;
    
    this.broadcastInterval = setInterval(() => {
      if (this.server) {
        this.server.emit('broadcast', {
          type: 'update',
          timestamp: new Date().toISOString(),
          message: 'Regular update from Epona server'
        });
        console.log('Broadcast message sent to all clients');
      }
    }, intervalSeconds * 1000);
  }

  onModuleDestroy() {
    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval);
    }
  }

  handleConnection(client: Socket) {
    console.log(`Epona client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Epona client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat')
  async handleChat(client: Socket, payload: ChatDto) {
    try {
      if (!payload.message) {
        payload.message = 'whats the weather?';
      }
      
      await this.eponaService.chatSocket({
        message: payload.message,
        socketClient: client
      });
    } catch (error) {
      console.error('Error in chat socket:', error);
      client.emit('chatError', { message: 'Error in chat processing. Is OLLAMA running?' });
    }
  }
} 