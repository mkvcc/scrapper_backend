import { ApiProperty } from '@nestjs/swagger';
import validator, { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class StoreUserDto {

  @ApiProperty({
    type: String,
    example: 'john',
  })
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

   @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;
 
}
