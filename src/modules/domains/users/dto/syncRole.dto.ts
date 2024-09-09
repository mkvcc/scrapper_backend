import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";

export class syncRolesDto{
    
    @ApiProperty({
    type: [Number], 
    example: [1, 2, 3]}
    )
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    roleIds: number[]

 } 