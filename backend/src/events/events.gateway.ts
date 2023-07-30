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
import { LocationUpdateDto, MissionDoneDto } from './dtos.models';
import { Report } from '../entities/report.entity';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { websocketPort } from '../app.const';
import { Mission } from '../entities/mission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MissionService } from '../services/mission.service';

@WebSocketGateway(websocketPort)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server?: ws.WebSocketServer;
  private clients: WebSocket[] = [];

  constructor(private readonly usersService: UsersService,
              private readonly missionService: MissionService,
              @InjectRepository(Report) private readonly reportRepository: Repository<Report>) {
  }

  async sendNewMission(mission: Mission) {
    const user = (await this.usersService.getUserById(mission.userId))!;
    const report = (await this.reportRepository.findOneBy({ id: mission.reportId }))!;

    const message = {
      ...mission,
      latitude: user.latitude,
      longitude: user.latitude,
      text: report.text,
      fileLocation: report.fileLocation,
    };

    this.server?.clients.forEach((client: WebSocket) => {
      client.send(
        JSON.stringify({
          event: 'NewMission',
          data: JSON.stringify(message),
        }),
      );
    });
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

  @SubscribeMessage('MissionDone')
  async missionDone(@MessageBody() data: MissionDoneDto, @ConnectedSocket() ws: WebSocket) {
    await this.missionService.markAsDone(data.missionId);
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
