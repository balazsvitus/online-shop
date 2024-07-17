import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Product from './product.domain';
import Location from '../../shared/domain/Location';

@Entity()
export default class Stock {
  @PrimaryColumn()
  productId: string;

  @PrimaryColumn()
  locationId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column()
  quantity: number;
}
