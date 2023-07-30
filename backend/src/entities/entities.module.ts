import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Report } from './report.entity';
import { Mission } from './mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Report, Mission])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {
}