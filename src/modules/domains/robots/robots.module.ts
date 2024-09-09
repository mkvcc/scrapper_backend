import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';
import { Execute } from './entity/execute.entity';
import { QueueService } from './queue.service';
import { ExecuteHistory } from './entity/execute_history.entity';


@Module({
  controllers: [ RobotController],
  providers: [RobotService , QueueService],
  imports: [
    TypeOrmModule.forFeature([Execute  , ExecuteHistory]),
  ],

})
export class RobotsModule {
}
