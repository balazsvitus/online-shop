import { ApiProperty } from '@nestjs/swagger';

export default class LocationDTO {
  @ApiProperty({ description: 'The name of the location' })
  name: string;
  @ApiProperty({ description: 'The country of the location' })
  country: string;
  @ApiProperty({ description: 'The city of the location' })
  city: string;
  @ApiProperty({ description: 'The county of the location' })
  county: string;
  @ApiProperty({ description: 'The street address of the location' })
  streetAddress: string;

  constructor(
    name: string,
    country: string,
    city: string,
    county: string,
    streetAddress: string,
  ) {
    this.name = name;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAddress = streetAddress;
  }
}
