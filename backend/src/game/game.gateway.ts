import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    // allows the vite frontend origin so the browser does not block the socket handshake
    origin: 'http://localhost:5173',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // gives this gateway access to the socket.io server so it can emit events to clients
  @WebSocketServer()
  server: Server;

  // keeps game rules outside the gateway so socket handling and game logic stay separated
  constructor(private readonly gameService: GameService) {}

  // receives a test event so we can prove the socket carries data from client to server
  @SubscribeMessage('ping')
  handlePing(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Ping from ${client.id}: ${message}`);

    // sends a reply to only this client so we can prove server-to-client events work
    client.emit('pong', `Server received: ${message}`);
  }

  handleConnection(client: Socket) {
    // hands the socket id to the service so room state starts outside the gateway
    this.gameService.addPlayerToRoom(client.id);
    // logs the socket id so we can prove that each browser tab gets its own connection
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // logs disconnects now; later this is where we will clean up rooms, roles, and timers
    console.log(`Client disconnected: ${client.id}`);
  }
}
