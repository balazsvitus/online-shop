import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import OrderDetailCheckoutDTO from './orderDetailsCheckout.dto';

export default class OrderCheckoutDTO {
  @ApiProperty({
    description: 'The ID of the customer who placed the order',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  customer: string;
  @ApiProperty({
    description: 'The date when the order was placed',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  createdAt: Date;
  @ApiProperty({
    description: 'The country the order was placed in',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  country: string;
  @ApiProperty({
    description: 'The city the order was placed in',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  city: string;
  @ApiProperty({
    description: 'The county the order was placed in',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  county: string;
  @ApiProperty({
    description: 'The address the order was placed in',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  streetAddress: string;
  @ApiProperty({
    description: 'The list of order details',
    type: [OrderCheckoutDTO],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailCheckoutDTO)
  orderDetails: OrderDetailCheckoutDTO[];

  constructor(
    customer: string,
    createdAt: Date,
    country: string,
    city: string,
    county: string,
    streetAddress: string,
    orderDetails: OrderDetailCheckoutDTO[],
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAddress = streetAddress;
    this.orderDetails = orderDetails;
  }
}
