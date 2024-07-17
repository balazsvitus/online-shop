export default class OrderDetailDTO {
  orderId: string;
  productId: string;
  shippedFrom: Location;
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
