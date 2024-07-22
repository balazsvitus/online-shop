import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
