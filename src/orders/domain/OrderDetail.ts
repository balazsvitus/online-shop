import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Order from './Order';
import Product from '../../products/domain/Product';
import Location from '../../shared/domain/Location';

@Entity()
export default class OrderDetail {
  // delete this
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @PrimaryColumn()
  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  // @PrimaryColumn()
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Location, (location) => location.id)
  shippedFrom: Location;

  @Column()
  quantity: number;
}
