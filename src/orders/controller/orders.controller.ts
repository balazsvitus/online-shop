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
import Order from '../domain/order.domain';
import { CustomersService } from 'src/customers/service/customers.service';
import OrderDTO from '../dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersMapper: OrdersMapper,
    private ordersService: OrdersService,
    private customersService: CustomersService,
  ) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return await this.ordersService.getOrders();
  }

  @Get(':id')
  async getOrderById(@Param() { id }: { id: string }): Promise<Order | null> {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() orderDTO: OrderDTO): Promise<Order> {
    const customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );
    const order = await this.ordersService.createOrder(
      this.ordersMapper.dtoToOrder(orderDTO, customer),
    );
    order.customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );

    return order;
  }

  @Put(':id')
  async updateOrder(
    @Param() { id }: { id: string },
    @Body() orderDTO: OrderDTO,
  ): Promise<Order> {
    const customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );
    const order = await this.ordersService.createOrder(
      this.ordersMapper.dtoToOrder(orderDTO, customer),
    );
    order.id = id;

    return await this.ordersService.updateOrder(order);
  }

  @Delete(':id')
  async removeOrder(@Param() { id }: { id: string }) {
    await this.ordersService.removeOrder(id);
  }
}
