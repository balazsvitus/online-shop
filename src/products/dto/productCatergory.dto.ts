import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class ProductCategoryDTO {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;
  @ApiProperty({ description: 'The description of the category' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
