import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product.domain';

@Entity()
export default class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];

  constructor(name: string, description: string, products: Product[]) {
    this.name = name;
    this.description = description;
    this.products = products;
  }
}
