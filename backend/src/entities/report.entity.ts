import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn() id: number;
  @Column() text: string;
  @Column() fileLocation: string;
  @Column() userId: number;
}