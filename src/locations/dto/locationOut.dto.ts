import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';

export default class LocationOutDTO {
  @ApiProperty({ description: 'The id of the location' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ description: 'The name of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;
  @ApiProperty({ description: 'The country of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  country: string;
  @ApiProperty({ description: 'The city of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  city: string;
  @ApiProperty({ description: 'The county of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  county: string;
  @ApiProperty({ description: 'The street address of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  streetAddress: string;

  constructor(
    id: string,
    name: string,
    country: string,
    city: string,
    county: string,
    streetAddress: string,
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAddress = streetAddress;
  }
}
