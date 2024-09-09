import { Injectable } from '@nestjs/common';
import { UsersService } from '../domains/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../libs/utils/hash.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      if (await this.hashService.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    
    const payload = {id: user.id,
      username: user.username, 
      email:user.email, roles: user.roles};
  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
