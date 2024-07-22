import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export default class StockDTO {
  @ApiProperty({ description: 'The ID of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  productId: string;
  @ApiProperty({ description: 'The ID of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  locationId: string;
  @ApiProperty({
    description: 'The quantity of the products in the specific location',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  constructor(productId: string, locationId: string, quantity: number) {
    this.productId = productId;
    this.locationId = locationId;
    this.quantity = quantity;
  }
}
