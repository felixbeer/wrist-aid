import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import * as ws from 'ws';
import WebSocket from 'ws';

@WebSocketGateway(3001)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server?: ws.WebSocketServer;
  private clients: WebSocket[] = [];

  sendNewReport(text: string) {
    this.server?.clients.forEach((client: WebSocket) => {
      client.send(JSON.stringify({
        type: 'NewReport',
        data: JSON.stringify({ text }),
      }));
    });
  }

  // as described here: https://stackoverflow.com/questions/67282484/subcribemessage-decorator-doesnt-trigger-on-event-message
  // the 'message' of the socket have to be in the format { "event": "locationUpdate", "data": { ... } }
  // in order to work with @SubscribeMessage
  @SubscribeMessage('locationUpdate')
  locationUpdate(@MessageBody() data: any, @ConnectedSocket() ws: WebSocket) {
    console.log(data);
  }

  afterInit(server: ws.WebSocketServer): any {

  }

  handleConnection(client: WebSocket, ...args: any[]): any {
    this.clients.push(client);
  }

  handleDisconnect(client: WebSocket): any {
    this.clients = this.clients.filter(ws => ws !== client);
  }
}