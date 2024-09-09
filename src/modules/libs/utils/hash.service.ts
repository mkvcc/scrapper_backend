import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async getHash(value: string): Promise<string> {
    const saltOrRounds = 10;
    const hashed = await bcrypt.hash(value, saltOrRounds);
    return hashed;
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
