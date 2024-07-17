import { Injectable } from '@nestjs/common';
import OrdersRepository from '../repository/orders.repository';
import Order from '../domain/order.domain';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.ordersRepository.findOne(id);
  }

  async createOrder(order: Order): Promise<Order> {
    return this.ordersRepository.create(order);
  }

  async updateOrder(order: Order): Promise<Order> {
    return this.ordersRepository.update(order);
  }

  async removeOrder(id: string): Promise<void> {
    this.ordersRepository.remove(id);
  }
}
