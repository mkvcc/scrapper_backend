import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExecuteDto } from './dto/execute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Execute } from './entity/execute.entity';
import { Repository } from 'typeorm';
import * as Bull from 'bull'
import { ExecuteHistory } from './entity/execute_history.entity';


let base_url = 'http://127.0.0.1:5000';

@Injectable()
export class QueueService {
  queue: Bull.Queue;

  constructor(
    @InjectRepository(Execute)
    private executeRep: Repository<Execute>,
    @InjectRepository(ExecuteHistory)
    private executeHistoryRep: Repository<ExecuteHistory>,

  ) {
    this.queue = new Bull('robot_queue', 'redis://127.0.0.1:6379');
    console.log("queue started")

    this.queue.process((job, done) => {

      setTimeout(() => {
        done();
      }, job.data.interval * 1000);

      this.runScript(job.data);

    })

  }

  private async runScript(data) {
    let response
    let error;
    console.log("@@@" ,typeof data.payload)
    try {
      response = await axios.post(base_url + '/execute', {
        "robot_name": data.robot_name,
        "payload": data.payload
      });
    } catch (e) {
      error = e;            
    }

    let execute_history = await this.executeHistoryRep.findOne({
      where: {
        id: data.id
      }
    })
    if (error) {
      execute_history.status = 2;
      execute_history.response_data = error ;
      await this.executeHistoryRep.save(execute_history)
    } else {

      execute_history.status = 3;
      execute_history.response_data = response.data;
      await this.executeHistoryRep.save(execute_history)

    }



  }



  public async generateQueue(execute: Execute) {
    for (let i = 0; i < execute.payload.length; i++) {
      let payload = execute.payload[i];

      let execute_history = this.executeHistoryRep.create({
        status: 1,
        payload: payload,
        executeId: execute.id,
      })
      let execute_history_record = await this.executeHistoryRep.save(execute_history);

      this.queue.add({
        id: execute_history.id,
        robot_name: execute.robot_name,
        // @ts-ignore
        payload: payload,
        interval: execute.interval
      })

    }

  }

}
