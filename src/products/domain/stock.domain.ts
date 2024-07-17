import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Product from './product.domain';
import Location from '../../products/domain/location.domain';

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

  constructor(productId: string, locationId: string, quantity: number) {
    this.productId = productId;
    this.locationId = locationId;
    this.quantity = quantity;
  }
}
