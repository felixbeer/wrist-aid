import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from '../entities/mission.entity';

@Injectable()
export class MissionService {
  constructor(@InjectRepository(Mission) private readonly missionRepository: Repository<Mission>) {
  }

  getAll() {
    return this.missionRepository.find();
  }

  getForUser(userId: number) {
    return this.missionRepository.findOneBy({ userId, done: false });
  }

  async storeMission(mission: Mission) {
    const newMission = new Mission();
    newMission.reportId = mission.reportId;
    newMission.userId = mission.userId;
    newMission.done = false;

    if (newMission.id != 0) {
      newMission.id = mission.id;
    }

    return await this.missionRepository.save(newMission);
  }

  async markAsDone(id: number) {
    const mission = (await this.missionRepository.findOneBy({ id }))!;
    mission.done = true;
    await this.missionRepository.save(mission);
  }
}