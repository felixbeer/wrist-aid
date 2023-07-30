import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MissionService } from './services/mission.service';
import { ApiBody, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { Mission } from './entities/mission.entity';
import { EventsGateway } from './events/events.gateway';

export class CreateMissionDto {
  @ApiProperty({ type: Number })
  userId: number;
  @ApiProperty({ type: Number })
  reportId: number;
}

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionService, private readonly webSocketGateway: EventsGateway) {
  }

  @Get()
  @ApiOkResponse({ type: Array<Mission> })
  async getAll() {
    return await this.missionsService.getAll();
  }

  @Get('for-user/:id')
  async getAllForUser(@Param('id', ParseIntPipe) userId: number) {
    const mission = await this.missionsService.getForUser(userId);
  }

  @Post()
  @ApiBody({
    description: 'mission specific data',
    type: CreateMissionDto,
  })
  async createMission(@Body() missionData: CreateMissionDto) {
    let mission = new Mission();
    mission.userId = missionData.userId;
    mission.reportId = missionData.reportId;
    mission = await this.missionsService.storeMission(mission);
    this.webSocketGateway.sendNewMission(mission);  // eventuell hier kein async
    return { id: mission.id };
  }
}