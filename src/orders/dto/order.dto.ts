import { ApiProperty } from '@nestjs/swagger';

export default class OrderDTO {
  @ApiProperty({
    description: 'The ID of the customer who placed the order',
  })
  customer: string;
  @ApiProperty({
    description: 'The date when the order was placed',
  })
  createdAt: string;
  @ApiProperty({
    description: 'The country the order was placed in',
  })
  country: string;
  @ApiProperty({
    description: 'The city the order was placed in',
  })
  city: string;
  @ApiProperty({
    description: 'The county the order was placed in',
  })
  county: string;
  @ApiProperty({
    description: 'The address the order was placed in',
  })
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
