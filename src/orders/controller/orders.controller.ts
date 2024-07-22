import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import OrdersMapper from '../mapper/orders.mapper';
import { OrdersService } from '../service/orders.service';
import { CustomersService } from 'src/customers/service/customers.service';
import OrderDTO from '../dto/order.dto';
import { ApiResponse } from '@nestjs/swagger';
import { OrderDetailsService } from '../service/orderDetails.service';
import OrderDetailsMapper from '../mapper/orderDetails.mapper';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtGuard)
export class OrdersController {
  constructor(
    private ordersMapper: OrdersMapper,
    private ordersService: OrdersService,
    private customersService: CustomersService,
    private orderDetailsService: OrderDetailsService,
    private orderDetailsMapper: OrderDetailsMapper,
  ) {}

  @ApiResponse({ status: 200, description: 'Returns the orders' })
  @Get()
  async getOrders(): Promise<OrderDTO[]> {
    const orders = await this.ordersService.getOrders();
    const ordersDTO: OrderDTO[] = [];
    orders.map((order) => {
      const orderDetailDTO = this.orderDetailsMapper.orderDetailsToDtos(
        order.orderDetails,
      );
      ordersDTO.push(this.ordersMapper.orderToDto(order, orderDetailDTO));
    });
    return ordersDTO;
  }

  @ApiResponse({ status: 200, description: 'Returns the order' })
  @ApiResponse({ status: 404, description: "The order can't be found" })
  @Get(':id')
  async getOrderById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderDTO | null> {
    const order = await this.ordersService.getOrderById(id);
    return this.ordersMapper.orderToDto(order, []);
  }

  @ApiResponse({
    status: 201,
    description: 'The order was created successfully',
  })
  @Post()
  async createOrder(@Body() orderDTO: OrderDTO): Promise<OrderDTO> {
    // await this.ordersService.validateOrder(orderDTO.orderDetails);

    const orderDetails = this.orderDetailsMapper.inDtosToOrderDetails(
      '',
      orderDTO.orderDetails,
    );
    const customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );
    let order = this.ordersMapper.dtoToOrder(orderDTO, customer);
    order = await this.ordersService.createOrder(
      this.ordersMapper.dtoToOrder(orderDTO, customer),
      orderDetails,
    );

    return this.ordersMapper.orderToDto(order, orderDTO.orderDetails);
  }

  @ApiResponse({
    status: 200,
    description: 'The order was updated successfully',
  })
  @ApiResponse({ status: 404, description: "The order can't be found" })
  @Put(':id')
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() orderDTO: OrderDTO,
  ): Promise<OrderDTO> {
    const customer = await this.customersService.getCustomerById(
      orderDTO.customer,
    );
    const order = await this.ordersService.updateOrder(
      this.ordersMapper.dtoToOrder(orderDTO, customer),
    );
    order.id = id;

    return this.ordersMapper.orderToDto(
      await this.ordersService.updateOrder(order),
      [],
    );
  }

  @ApiResponse({
    status: 200,
    description: 'The order was deleted successfully',
  })
  @ApiResponse({ status: 404, description: "The order can't be found" })
  @Delete(':id')
  async removeOrder(@Param('id', ParseUUIDPipe) id: string) {
    await this.ordersService.removeOrder(id);
  }
}
