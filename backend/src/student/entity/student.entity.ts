import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  secondname: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column()
  university: string;

  @Column()
  faculty: string;

  @CreateDateColumn({ type: 'date' })
  applyDate!: string;
}
