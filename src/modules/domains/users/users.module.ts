import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from '../../libs/utils/utils.module';
import { AuthService } from 'src/modules/auth/auth.service';


@Module({
  controllers: [ UsersController],
  providers: [UsersService, AuthService, ],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User ]),
    JwtModule.register({
      secret: 's2gbjw0',
      signOptions: { expiresIn: '1d' },
    }),
    UtilsModule ,
  ],

})
export class UsersModule {
}
