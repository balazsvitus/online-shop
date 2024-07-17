import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  county: string;

  @Column({ nullable: false })
  streetAddress: string;
}
