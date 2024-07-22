import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export default class OrderDetailDTO {
  @ApiProperty({ description: 'The ID of the order' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  orderId: string;
  @ApiProperty({ description: 'The ID of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  productId: string;
  @ApiProperty({ description: 'The location the order is shipped from' })
  shippedFrom: Location; // Location | string
  @ApiProperty({ description: 'The quantity of the items shipped' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  constructor(
    orderId: string,
    productId: string,
    shippedFrom: Location,
    quantity: number,
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.shippedFrom = shippedFrom;
    this.quantity = quantity;
  }
}
