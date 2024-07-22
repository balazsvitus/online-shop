import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import CustomerInDTO from '../dto/customerIn.dto';
import CustomersMapper from '../mapper/customers.mapper';
import { CustomersService } from '../service/customers.service';
import CustomerOutDTO from '../dto/customerOut.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(
    private customersMapper: CustomersMapper,
    private customerService: CustomersService,
  ) {}

  @ApiResponse({ status: 200, description: 'The user was successfully found' })
  @ApiResponse({ status: 404, description: "The user can't be found" })
  @Get(':id')
  async getCustomerById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerOutDTO | null> {
    const user = await this.customerService.getCustomerById(id);
    return this.customersMapper.customerToOutDto(user);
  }

  @ApiResponse({
    status: 201,
    description: 'The user was created successfully',
  })
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
