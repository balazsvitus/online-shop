import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CustomerDTO from '../dto/customer.dto';
import CustomersMapper from '../mapper/customers.mapper';
import { CustomersService } from '../service/customers.service';
import Customer from '../domain/customer.domain';

@Controller('customers')
export class CustomersController {
  constructor(
    private customersMapper: CustomersMapper,
    private customerService: CustomersService,
  ) {}

  @Get(':id')
  async getCustomerById(
    @Param() { id }: { id: string },
  ): Promise<Customer | null> {
    return await this.customerService.getCustomerById(id);
  }

  @Post()
  async createCustomer(@Body() customerDTO: CustomerDTO): Promise<Customer> {
    return await this.customerService.createCustomer(
      this.customersMapper.dtoToCustomer(customerDTO),
    );
  }
}
