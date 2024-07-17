import { Injectable } from '@nestjs/common';
import CustomersRepository from '../repository/customers.repository';
import Customer from '../domain/customer.domain';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async getCustomerById(id: string): Promise<Customer | null> {
    return await this.customersRepository.findOne(id);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.customersRepository.create(customer);
  }
}
