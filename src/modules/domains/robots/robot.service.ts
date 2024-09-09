import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExecuteDto } from './dto/execute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Execute } from './entity/execute.entity';
import { Repository } from 'typeorm';
import Queue from 'bull';
import { QueueService } from './queue.service';
import { ExecuteHistory } from './entity/execute_history.entity';
import { execFile } from 'child_process';



let base_url = 'http://127.0.0.1:5000';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Execute)
    private executeRep: Repository<Execute>,
    @InjectRepository(ExecuteHistory)
    private executeHistoryRep: Repository<ExecuteHistory>,
    private readonly queueService: QueueService,
  ) { }

  async getRobots() {
    console.log("222" ,base_url) ;
    let response = await axios.get(base_url + '/');
    return response.data;
  }


  async execute(dto: ExecuteDto) {

    let execute = this.executeRep.create({
      name: dto.name,
      robot_name: dto.robot_name,
      payload: dto.payloads,
      interval: dto.interval,

    })

    execute = await this.executeRep.save(execute);
    this.queueService.generateQueue(execute);

  }


  public async getProcessedData(execute_id) {

    
   let execute =  await this.executeRep.findOne({
      where: {
        id: execute_id
      } ,
      relations: [
        "execute_history"
      ]
    }) ;
    

    let response_list = [] ;
    
    console.log("@###" , execute)
    
    for (let index = 0; index < execute.execute_history.length; index++) {
      const element = execute.execute_history[index];
      if (element.status === 3) {
        response_list.push({
          // @ts-ignore
          req: element.payload,
          res: element.response_data
        }) ;
      }
    }
    


    

    let response = await axios.post(base_url + '/get_proccesed_data',  {
      robot_name: execute.robot_name ,
      data: response_list ,
    });
    console.log("@@@@" , response.data) ;
    return response.data ;

  }


  public async getExecutes(): Promise<Execute[]> {
    let records = await this.executeRep.find({
      order: {
        id: "DESC"
      },
      relations: [
        "execute_history"
      ]
    });
    records.forEach((r) => {
      // @ts-ignore
      r.history_count = r.execute_history.length;
      r.execute_history = [];
    })
    return records;
  }

  public async getExecuteHistory(id: number): Promise<ExecuteHistory[]> {
    let records = await this.executeHistoryRep.find({
      where: {
        executeId: id,
      },
    });
    return records;
  }

}
