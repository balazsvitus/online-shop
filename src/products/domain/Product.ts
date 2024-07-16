import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ProductCategory from './ProductCategory';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  weight: number;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.id)
  category: ProductCategory;

  @Column({ nullable: false })
  supplier: string;

  @Column({ nullable: false })
  imageUrl: string;
}
