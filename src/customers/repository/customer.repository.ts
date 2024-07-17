import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Customer from '../domain/customer.domain';
import { Repository } from 'typeorm';

@Injectable()
export default class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: string): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ id });
  }

  async createCustomer(customerDTO: Customer): Promise<Customer> {
    return this.customerRepository.save(customerDTO);
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
