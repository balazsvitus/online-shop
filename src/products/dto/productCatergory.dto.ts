import { ApiProperty } from '@nestjs/swagger';

export default class ProductCategoryDTO {
  @ApiProperty({ description: 'The name of the category' })
  name: string;
  @ApiProperty({ description: 'The description of the category' })
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
