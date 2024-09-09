import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { loginDTO } from './modules/domains/users/dto/login.dto';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('/api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDTO: loginDTO, @Req() req: Request) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

}
