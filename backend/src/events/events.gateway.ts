import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import * as ws from 'ws';
import WebSocket from 'ws';

@WebSocketGateway(3001)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  private server?: ws.WebSocketServer;

  sendNewReport() {
    this.server?.clients.forEach((client: WebSocket) => {
      client.send({
        type: 'NewReport',
        data: 'no data',
      }.toString());
    });
  }

  // as described here: https://stackoverflow.com/questions/67282484/subcribemessage-decorator-doesnt-trigger-on-event-message
  // the 'message' of the socket have to be in the format { "event": "locationUpdate", "data": { ... } }
  // in order to work with @SubscribeMessage
  @SubscribeMessage('locationUpdate')
  locationUpdate(@MessageBody() data: any) {
    console.log(data);
  }

  handleConnection(client: WebSocket, ...args: any[]): any {
    client.on('message', (data) => {
      const obj = JSON.parse(data.toString());

      if (obj.event === 'locationUpdate') {
        console.log(obj.data);
      }
    });
  }

  afterInit(server: any): any {
  }
}