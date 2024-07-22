import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export default class OrderDetailInDTO {
  @ApiProperty({ description: 'The ID of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  productId: string;
  @ApiProperty({ description: 'The location the order is shipped from' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  shippedFrom: string;
  @ApiProperty({ description: 'The quantity of the items shipped' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  constructor(productId: string, shippedFrom: string, quantity: number) {
    this.productId = productId;
    this.shippedFrom = shippedFrom;
    this.quantity = quantity;
  }
}
