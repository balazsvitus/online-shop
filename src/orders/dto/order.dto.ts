import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export default class OrderDTO {
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
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  createdAt: string;
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

  constructor(
    customer: string,
    createdAt: string,
    country: string,
    city: string,
    county: string,
    streetAddress: string,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAddress = streetAddress;
  }
}
