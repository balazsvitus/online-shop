import { Injectable } from '@nestjs/common';
import CustomerRepository from '../repository/customer.repository';
import Customer from '../domain/customer.domain';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async getCustomerById(id: string) {
    return await this.customerRepository.findOne(id);
  }

  async createCustomer(customer: Customer) {
    return await this.customerRepository.createCustomer(customer);
  }
}
