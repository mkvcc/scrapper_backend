import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ExecuteHistory } from './execute_history.entity';

@Entity()
export class Execute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  robot_name: string;

  @Column({
    nullable: true,
  })
  interval: number;

  @Column( 'jsonb' ,{ nullable: true })
  payload: object[];

  


  @OneToMany(() => ExecuteHistory, (execute_history) => execute_history.execute)
  execute_history: ExecuteHistory[];

}

