import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CustomersService {
  private customers: string[];

  constructor() {
    this.customers = [];
  }

  getCustomers(): string[] {
    return this.customers;
  }

  getCustomerByName(customer: string): string {
    if (!this.customers.includes(customer)) {
      throw new NotFoundException(
        `No user can be found with the name: ${customer}`,
      );
    }
    return this.customers.find((element) => element === customer);
  }

  createCustomer(customer: string): string {
    this.customers.push(customer);
    return customer;
  }

  updateCustomer(customer: string, newCustomer: string): string {
    if (!this.customers.includes(customer)) {
      throw new NotFoundException(
        `No user can be found with the name: ${customer}`,
      );
    }
    const index = this.customers.indexOf(customer);
    this.customers[index] = newCustomer;
    return this.customers.find((element) => element === newCustomer);
  }

  deleteCustomer(customer: string): void {
    this.customers = this.customers.filter(
      (customersItem) => customersItem !== customer,
    );
  }
}
