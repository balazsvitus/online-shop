import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import ProductOutDTO from './productOut.dto';
import LocationOutDTO from 'src/locations/dto/locationOut.dto';

export default class StockOutDTO {
  @ApiProperty({ description: 'The ID of the product' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  product: ProductOutDTO;
  @ApiProperty({ description: 'The ID of the location' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  location: LocationOutDTO;
  @ApiProperty({
    description: 'The quantity of the products in the specific location',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  constructor(
    product: ProductOutDTO,
    location: LocationOutDTO,
    quantity: number,
  ) {
    this.product = product;
    this.location = location;
    this.quantity = quantity;
  }
}
