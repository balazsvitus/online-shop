import Customer from '../../customers/domain/customer.domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderDetail from './orderDetail.domain';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

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
