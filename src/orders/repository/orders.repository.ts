import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from '../domain/order.domain';

@Injectable()
export default class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['customer'] });
  }

  findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  create(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  update(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
