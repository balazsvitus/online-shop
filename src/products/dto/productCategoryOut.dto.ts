import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class ProductCategoryOutDTO {
  @ApiProperty({ description: 'The id of the category' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
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

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
