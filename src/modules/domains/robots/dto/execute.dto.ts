import { ApiProperty } from '@nestjs/swagger';
import validator, { IsArray, IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class ExecuteDto {

  @ApiProperty({
    type: String,
    example: 'execute number 39',
  })
  @IsString()
  name: string;
  
  
  @ApiProperty({
    type: String,
    example: 'test',
  })
  @IsString()
  robot_name: string;
 
 
  @ApiProperty({
    type: Number,
    example: 3,
  })
  @IsNumber()
  interval: number;


  @ApiProperty({
    type: Array,
    example: [{username: "test"}],
  })
  @IsArray()
  payloads: object[];


 
}
