import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCategory from './productCategory.domain';

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

  @Column({ nullable: false, type: 'decimal' })
  weight: number;

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @Column({ nullable: false })
  supplier: string;

  @Column({ nullable: false })
  imageUrl: string;

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    category: ProductCategory,
    supplier: string,
    imageUrl: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.category = category;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
  }

  getCategory(): ProductCategory {
    return this.category;
  }
}
