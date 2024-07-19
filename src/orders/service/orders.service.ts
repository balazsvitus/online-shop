import { Injectable, NotFoundException } from '@nestjs/common';
import OrdersRepository from '../repository/orders.repository';
import Order from '../domain/order.domain';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

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

  createOrder(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  async updateOrder(order: Order): Promise<Order> {
    await this.getOrderById(order.id);
    return this.ordersRepository.save(order);
  }

  async removeOrder(id: string): Promise<void> {
    await this.getOrderById(id);
    this.ordersRepository.remove(id);
  }
}
