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

  async getCustomersByUsername(username: string) {
    return await this.customersRepository.findOneByUsername(username);
  }

  // async createCustomer(customer: Customer): Promise<Customer> {
  //   return await this.customersRepository.create(customer);
  // }

  createCustomer(customer: Customer): Promise<Customer> {
    return this.customersRepository.create(customer);
  }
}
