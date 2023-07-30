import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Report } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Report])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {
}