import { ApiProperty } from '@nestjs/swagger';

export default class StockDTO {
  @ApiProperty({ description: 'The ID of the product' })
  productId: string;
  @ApiProperty({ description: 'The ID of the location' })
  locationId: string;
  @ApiProperty({
    description: 'The quantity of the products in the specific location',
  })
  quantity: number;

  constructor(productId: string, locationId: string, quantity: number) {
    this.productId = productId;
    this.locationId = locationId;
    this.quantity = quantity;
  }
}
