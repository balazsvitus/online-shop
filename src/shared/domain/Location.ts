import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  county: string;

  @Column()
  streetAddress: string;
}
