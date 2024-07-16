import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from '../service/customers.service';

type Customer = {
  name: string;
};

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  getCustomers(): string[] {
    return this.customerService.getCustomers();
  }

  @Get(':name')
  getCustomerByName(@Param() { name }: { name: string }): string {
    return this.customerService.getCustomerByName(name);
  }

  @Post()
  createCustomer(@Body() customerBody: Customer): string {
    return this.customerService.createCustomer(customerBody.name);
  }

  @Put(':name')
  updateCustomer(
    @Param() { name }: { name: string },
    @Body() customerBody: Customer,
  ): string {
    return this.customerService.updateCustomer(name, customerBody.name);
  }

  @Delete(':name')
  deleteCustomer(@Param() { name }: { name: string }): void {
    this.customerService.deleteCustomer(name);
  }
}
