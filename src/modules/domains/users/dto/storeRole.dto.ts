import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StoreRoleDto {
  @ApiProperty({
    type: String,
    example: 'Editor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'editor',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    type: String,
    example: 'can edit entities',
  })
  @IsString()
  description: string;
}
