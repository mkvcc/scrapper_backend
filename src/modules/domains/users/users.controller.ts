import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreUserDto } from './dto/storeUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { HashService } from '../../libs/utils/hash.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)

@ApiBearerAuth()

@Controller('/api/users')
export class UsersController {
  constructor(
    private hashService: HashService,
    @InjectRepository(User)
    private userRep: Repository<User>,
  ) {}

  @ApiQuery({ name: 'page', type: 'number', example: 1 })


  @ApiTags('user-user')
  @Get('/')
  async findAll(@Query() query_params) {
    let query = this.userRep.createQueryBuilder();
    let users = await paginate<User>(query, {
      page: query_params.page || 1,
      limit: 8,
    });
    return {
      data: users,
    };
  }


 
  @ApiTags('user-user')
  @Post()
  @ApiTags('user-user/user/edit')
  async store(@Body() userDto: StoreUserDto): Promise<any> {
    if (userDto.password) {
      userDto.password = await this.hashService.getHash(userDto.password);
    }

    let user = this.userRep.create(userDto);
    await this.userRep.save(user);

    return {
      data: user,
    };
  }

  @Put('/:id')
  @ApiTags('user-user')
  async update(
    @Param('id') id: number,
    @Body() userDto: UpdateUserDto,
  ): Promise<any> {
    await this.userRep.update({ id: id }, userDto);
    let user = await this.userRep.findOneByOrFail({
      id: id,
    });

    return {
      data: user,
    };
  }

  
  @Delete('/:id')
  @ApiTags('user-user')
  async delete(@Param('id') id: string): Promise<any> {
    let user = await this.userRep.findOneByOrFail({
      id: parseInt(id),
    });

    let l = await this.userRep.remove(user);
    return {
      message: 'delete successfull',
    };
  }

 
}
