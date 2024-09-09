import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { syncRolesDto } from './dto/syncRole.dto';
import { UserPermissionManager } from './UserPermissionManager';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRep: Repository<User>,
  ) { }

  async findOne(email: string): Promise<User | undefined> {
    let user = await this.usersRep
      .createQueryBuilder()
      .where('email=:email', { email: email })
      .getOne();
    return user;
  }
}
