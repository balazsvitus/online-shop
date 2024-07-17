import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Order from './order.domain';
import Product from '../../products/domain/product.domain';
import Location from '../../products/domain/location.domain';

@Entity()
export default class OrderDetail {
  @PrimaryColumn()
  orderId: string;

  @PrimaryColumn()
  productId: string;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orderID' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.id)
  shippedFrom: Location;

  @Column()
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
