import { Injectable } from '@nestjs/common';

type Order = {
  orderNumber: number;
  item: string;
  quantity: number;
  pricePerUnit: number;
};

@Injectable()
export class OrdersService {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  // getOrders(): string[] {
  //   return this.orders;
  // }

  // getOrderByName(customer: string): string {
  //   if (!this.orders.includes(customer)) {
  //     throw new NotFoundException(
  //       `No user can be found with the name: ${customer}`,
  //     );
  //   }
  //   return this.orders.find((element) => element === customer);
  // }

  // createOrder(customer: string): string {
  //   this.orders.push(customer);
  //   return customer;
  // }

  // updateOrder(customer: string, newOrder: string): string {
  //   if (!this.orders.includes(customer)) {
  //     throw new NotFoundException(
  //       `No user can be found with the name: ${customer}`,
  //     );
  //   }
  //   const index = this.orders.indexOf(customer);
  //   this.orders[index] = newOrder;
  //   return this.orders.find((element) => element === newOrder);
  // }

  // deleteOrder(customer: string): void {
  //   this.orders = this.orders.filter((ordersItem) => ordersItem !== customer);
  // }
}
