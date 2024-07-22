import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CustomersRepository from '../repository/customers.repository';
import Customer from '../domain/customer.domain';
import { hash } from 'bcrypt';

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

  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const hashedPassword = await hash(customer.password, 10);
      customer.password = hashedPassword;
      return await this.customersRepository.create(customer);
    } catch (error) {
      throw new BadRequestException('User with this username already exists');
    }
  }
}
