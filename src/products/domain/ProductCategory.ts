import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
