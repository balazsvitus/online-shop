import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CustomerInDTO from '../dto/customer.indto';
import CustomersMapper from '../mapper/customers.mapper';
import { CustomersService } from '../service/customers.service';
import CustomerOutDTO from '../dto/customer.outdto';

@Controller('customers')
export class CustomersController {
  constructor(
    private customersMapper: CustomersMapper,
    private customerService: CustomersService,
  ) {}

  @Get(':id')
  async getCustomerById(
    @Param() { id }: { id: string },
  ): Promise<CustomerOutDTO | null> {
    return this.customersMapper.customerToOutDto(
      await this.customerService.getCustomerById(id),
    );
  }

  @Post()
  async createCustomer(
    @Body() customerDTO: CustomerInDTO,
  ): Promise<CustomerOutDTO> {
    return this.customersMapper.customerToOutDto(
      await this.customerService.createCustomer(
        this.customersMapper.inDtoToCustomer(customerDTO),
      ),
    );
  }
}
