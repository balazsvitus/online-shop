import { ApiProperty } from '@nestjs/swagger';

export default class ProductDTO {
  @ApiProperty({ description: 'The name of the product' })
  name: string;
  @ApiProperty({ description: 'The description of the product' })
  description: string;
  @ApiProperty({ description: 'The price of the product' })
  price: number;
  @ApiProperty({ description: 'The weight of the product' })
  weight: number;
  @ApiProperty({ description: 'The category of the product' })
  category: string;
  @ApiProperty({ description: 'The supplier of the product' })
  supplier: string;
  @ApiProperty({ description: 'The URL of the product image' })
  imageUrl: string;

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    category: string,
    supplier: string,
    imageUrl: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.category = category;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
  }
}
