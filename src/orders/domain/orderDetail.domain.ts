import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Order from './order.domain';
import Product from '../../products/domain/product.domain';
import Location from '../../locations/domain/location.domain';

@Entity()
export default class OrderDetail {
  @PrimaryColumn()
  orderId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @PrimaryColumn()
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  shippedFromId: string;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'shippedFromId' })
  shippedFrom: Location;

  @Column({ nullable: false })
  quantity: number;

  constructor(
    orderId: string,
    productId: string,
    shippedFromId: string,
    quantity: number,
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.shippedFromId = shippedFromId;
    this.quantity = quantity;
  }
}
