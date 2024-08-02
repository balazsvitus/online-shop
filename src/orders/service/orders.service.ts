import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import OrdersRepository from '../repository/orders.repository';
import Order from '../domain/order.domain';
import { OrderDetailsService } from './orderDetails.service';
import OrderDetail from '../domain/orderDetail.domain';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderDetailsService: OrderDetailsService,
  ) {}

  getOrders(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = await this.ordersRepository.findOne(id);
    if (!order) {
      throw new NotFoundException("The order can't be found");
    }
    return order;
  }

  async createOrder(order: Order, orderDetails: OrderDetail[]): Promise<Order> {
    await this.validateOrder(orderDetails);

    const savedOrder = await this.ordersRepository.save(order);
    await this.orderDetailsService.decreaseStock(orderDetails);
    orderDetails.map((orderDetail) => {
      orderDetail.orderId = savedOrder.id;
    });
    await this.orderDetailsService.saveOrderDetails(orderDetails);
    savedOrder.orderDetails = orderDetails;

    return savedOrder;
  }

  async checkoutOrder(
    order: Order,
    orderDetails: OrderDetail[],
  ): Promise<Order> {
    console.log(order, orderDetails);
    return order;
  }

  async validateOrder(orderDetails: OrderDetail[]): Promise<void> {
    const orderValid =
      await this.orderDetailsService.validateOrderDetails(orderDetails);
    if (!orderValid) {
      throw new BadRequestException(
        'There are less items in stock than required!',
      );
    }
  }

  async updateOrder(order: Order): Promise<Order> {
    await this.getOrderById(order.id);
    return this.ordersRepository.save(order);
  }

  async removeOrder(id: string): Promise<void> {
    await this.getOrderById(id);
    await this.ordersRepository.remove(id);
  }
}
