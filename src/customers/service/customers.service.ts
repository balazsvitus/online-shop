import { Injectable, NotFoundException } from '@nestjs/common';
import CustomersRepository from '../repository/customers.repository';
import Customer from '../domain/customer.domain';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async getCustomerById(id: string): Promise<Customer | null> {
    const customer = await this.customersRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException("The customer can't be found");
    }
    return customer;
  }

  createCustomer(customer: Customer): Promise<Customer> {
    return this.customersRepository.create(customer);
  }
}
