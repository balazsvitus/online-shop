import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import ProductCategoryOutDTO from './productCategoryOut.dto';

export default class ProductOutDTO {
  @ApiProperty({ description: 'The id of the product' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;
  @ApiProperty({ description: 'The description of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  description: string;
  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;
  @ApiProperty({ description: 'The weight of the product' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  weight: number;
  @ApiProperty({ description: 'The category of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  category: ProductCategoryOutDTO;
  @ApiProperty({ description: 'The supplier of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  supplier: string;
  @ApiProperty({ description: 'The URL of the product image' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  imageUrl: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    weight: number,
    category: ProductCategoryOutDTO,
    supplier: string,
    imageUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.category = category;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
  }
}
