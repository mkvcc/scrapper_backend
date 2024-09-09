import { ApiProperty } from '@nestjs/swagger';

export class loginDTO {
  @ApiProperty({
    example: 'admin@admin.com',
  })
  email: string;
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
