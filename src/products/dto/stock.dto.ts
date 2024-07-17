export default class StockDTO {
  productId: string;
  locationId: string;
  quantity: number;

  constructor(productId: string, locationId: string, quantity: number) {
    this.productId = productId;
    this.locationId = locationId;
    this.quantity = quantity;
  }
}
