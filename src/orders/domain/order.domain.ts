import Customer from '../../customers/domain/customer.domain';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;

  @Column({ nullable: false })
  createdAt: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  county: string;

  @Column({ nullable: false })
  streetAddress: string;

  constructor(
    customer: Customer,
    createdAt: string,
    country: string,
    city: string,
    county: string,
    streetAddress: string,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAddress = streetAddress;
  }
}
