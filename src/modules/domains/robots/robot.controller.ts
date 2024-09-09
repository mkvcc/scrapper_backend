import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RobotService } from './robot.service';
import { ExecuteDto } from './dto/execute.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("robots")
@Controller('/api')
export class RobotController {
  constructor(
    private readonly robotService: RobotService,
  ) {}

  @Get('/robots')
  async getRobots() {
    let robots = await this.robotService.getRobots() ;
    return robots; 
  }

  @Post('/execute')
  async execute(@Body() dto: ExecuteDto)  {
    let robots = await this.robotService.execute(dto) ;
    return true; 
  }
  
  
  @Get('/execute')
  async getExecute()  {
    let executes = await this.robotService.getExecutes() ;
    return executes; 
  }

  @Get('/processed_data/:id')
  async getProcessedData(@Param('id') id: number)  {
    let data = await this.robotService.getProcessedData(id) ;
    console.log("3333" , data) ;
    return data; 
  }

  @Get('/execute_history/:id')
  async getExecuteHistory(@Param('id') id: number)  {
    let executes = await this.robotService.getExecuteHistory(id) ;
    return executes; 
  }




}
