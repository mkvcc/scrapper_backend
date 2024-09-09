import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Execute } from './execute.entity';

@Entity()
export class ExecuteHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  // 0 -> cancelled , 2 -> errored , 1 -> waiting , 3 -> completed
  @Column({
    nullable: true,
  })
  status: number;

  @Column( 'jsonb' ,{ nullable: true })
  payload: object;
  
  
  @Column( 'jsonb' ,{ nullable: true })
  response_data?: object;

  @Column({
    nullable: true,
  })
  executeId: number;
  
  @ManyToOne(() => Execute, (e) => e.execute_history)
  execute: Execute ;
  
  
  
}

