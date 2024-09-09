import { getRepositoryToken } from '@nestjs/typeorm';
import { HashService } from 'src/modules/libs/utils/hash.service';
import { User } from 'src/modules/domains/users/user.entity';
import { Repository } from 'typeorm';
import BaseSeeder from '../BaseSeeder';

export default class AuthSeeder extends BaseSeeder {
  async run() {
    let UserRepository = this.module.get<Repository<User>>(
      getRepositoryToken(User),
    );



    let hashService = await this.module.get(HashService);

    let admin_user = await UserRepository.createQueryBuilder()
      .where('email = :email', { email: 'admin@admin.com' })
      .getOne();

    if (!admin_user) {
      console.log('no admin user found creating one');

      let pass = await hashService.getHash("password");
      let admin = await UserRepository.createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: 'admin',
          password: pass,
          email: 'admin@admin.com',
          isActive: true,
        })
        .execute();

      admin_user = await UserRepository.createQueryBuilder()
        .where('email = :email', { email: 'admin@admin.com' })
        .getOne();


      console.log("admin user craeted ", admin);
    }



  }

}
