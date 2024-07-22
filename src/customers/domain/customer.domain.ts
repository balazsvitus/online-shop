import Order from '../../orders/domain/order.domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  emailAddress: string;

  @OneToMany(() => Order, (order) => order.id)
  orders: Order[];

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    emailAddress: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
  }
}
