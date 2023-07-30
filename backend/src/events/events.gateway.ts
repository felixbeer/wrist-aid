import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as ws from 'ws';
import WebSocket from 'ws';
import { LocationUpdateDto } from './dtos.models';
import { Report } from '../entities/report.entity';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { websocketPort } from '../app.const';

@WebSocketGateway(websocketPort)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server?: ws.WebSocketServer;
  private clients: WebSocket[] = [];

  constructor(private readonly usersService: UsersService) {
  }

  async sendNewReport(report: Report) {
    const user = await this.usersService.getUserById(report.userId);
    let message = {
      reportId: report.id,
      fileLocation: report.fileLocation,
      text: report.text,
      userId: user!.id,
      longitude: user!.longitude,
      latitude: user!.latitude,
    };

    this.server?.clients.forEach((client: WebSocket) => {
      client.send(
        JSON.stringify({
          event: 'NewReport',
          data: JSON.stringify(message),
        }),
      );
    });
  }

  // as described here: https://stackoverflow.com/questions/67282484/subcribemessage-decorator-doesnt-trigger-on-event-message
  // the 'message' of the socket have to be in the format { "event": "locationUpdate", "data": { ... } }
  // in order to work with @SubscribeMessage
  @SubscribeMessage('LocationUpdate')
  async locationUpdate(
    @MessageBody() data: LocationUpdateDto,
    @ConnectedSocket() ws: WebSocket,
  ) {
    const user = new User();
    user.id = data.id;
    user.longitude = data.longitude;
    user.latitude = data.latitude;
    await this.usersService.storeUser(user);
  }

  afterInit(server: ws.WebSocketServer): any {
  }

  handleConnection(client: WebSocket, ...args: any[]): any {
    this.clients.push(client);
  }

  handleDisconnect(client: WebSocket): any {
    this.clients = this.clients.filter((ws) => ws !== client);
  }
}
