import { ApiProperty } from '@nestjs/swagger';

export default class OrderDetailDTO {
  @ApiProperty({ description: 'The ID of the order' })
  orderId: string;
  @ApiProperty({ description: 'The ID of the product' })
  productId: string;
  @ApiProperty({ description: 'The location the order is shipped from' })
  shippedFrom: Location | string;
  @ApiProperty({ description: 'The quantity of the items shipped' })
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
