import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import OrdersMapper from '../mapper/orders.mapper';
import { OrdersService } from '../service/orders.service';
import { CustomersService } from 'src/customers/service/customers.service';
import OrderDTO from '../dto/order.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersMapper: OrdersMapper,
    private ordersService: OrdersService,
    private customersService: CustomersService,
  ) {}

  @ApiResponse({ status: 200, description: 'Returns the orders' })
  @Get()
  async getOrders(): Promise<OrderDTO[]> {
    const orders = await this.ordersService.getOrders();

    const ordersDTO: OrderDTO[] = [];
    orders.map((order) => {
      ordersDTO.push(this.ordersMapper.orderToDto(order));
    });
    return ordersDTO;
  }

  @ApiResponse({ status: 200, description: 'Returns the order' })
  @ApiResponse({ status: 404, description: "The order can't be found" })
  @Get(':id')
  async getOrderById(
    @Param() { id }: { id: string },
  ): Promise<OrderDTO | null> {
    const order = await this.ordersService.getOrderById(id);
    return this.ordersMapper.orderToDto(order);
  }

  @ApiResponse({
    status: 201,
    description: 'The order was created successfully',
  })
  @Post()
  async createOrder(@Body() orderDTO: OrderDTO): Promise<OrderDTO> {
    const customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );
    const order = await this.ordersService.createOrder(
      this.ordersMapper.dtoToOrder(orderDTO, customer),
    );
    order.customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );

    return this.ordersMapper.orderToDto(order);
  }

  @ApiResponse({
    status: 200,
    description: 'The order was updated successfully',
  })
  @ApiResponse({ status: 404, description: "The order can't be found" })
  @Put(':id')
  async updateOrder(
    @Param() { id }: { id: string },
    @Body() orderDTO: OrderDTO,
  ): Promise<OrderDTO> {
    const customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );
    const order = await this.ordersService.createOrder(
      this.ordersMapper.dtoToOrder(orderDTO, customer),
    );
    order.id = id;

    return this.ordersMapper.orderToDto(
      await this.ordersService.updateOrder(order),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'The order was deleted successfully',
  })
  @ApiResponse({ status: 404, description: "The order can't be found" })
  @Delete(':id')
  async removeOrder(@Param() { id }: { id: string }) {
    await this.ordersService.removeOrder(id);
  }
}
