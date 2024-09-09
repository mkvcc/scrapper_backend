import { ApiProperty } from '@nestjs/swagger';
import validator, { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    example: 'john222222222222',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'green',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'test@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

   @ApiProperty({
    type: String,
    example: 'join_green',
  })
  @IsString()
  username: string;
 
}
