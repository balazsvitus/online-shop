import { Body, Controller, Get, Post } from '@nestjs/common';
import CustomerRepository from '../repository/CustomerRepository';
import CustomerDTO from '../dto/CustomerDTO';
import CustomersMapper from '../mapper/customers.mapper';

@Controller('customers')
export class CustomersController {
  constructor(
    private customerRepository: CustomerRepository,
    private customerMapper: CustomersMapper,
  ) {}

  @Get()
  async getAll() {
    const customers = await this.customerRepository.findAll();
    return customers;
  }

  @Post()
  async createCustomer(@Body() customerDTO: CustomerDTO) {
    const newCustomer = await this.customerRepository.createCustomer(
      this.customerMapper.dtoToCustomer(customerDTO),
    );
    return newCustomer;
  }
}
