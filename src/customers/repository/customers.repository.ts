import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Customer from '../domain/customer.domain';
import { Repository } from 'typeorm';

@Injectable()
export default class CustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  findOne(id: string): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ username });
  }

  async create(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }
}
