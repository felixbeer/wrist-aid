import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn() id: number;
  @Column() reportId: number;
  @Column() userId: number; // team which got that mission
  @Column() done: boolean;
}