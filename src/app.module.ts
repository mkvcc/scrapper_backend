import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/domains/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './modules/database/database.providers';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RobotsModule } from './modules/domains/robots/robots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: "324502840284",
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    RobotsModule ,
  ],
  controllers: [AppController  ],
  providers: [AppService  ],
})
export class AppModule {}
