import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Order from './Order';
import Product from '../../products/domain/Product';
import Location from '../../shared/domain/Location';

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
}
