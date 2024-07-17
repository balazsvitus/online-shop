import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OrderDetail from '../domain/orderDetail.domain';

@Injectable()
export default class OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find();
  }

  create(order: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsRepository.save(order);
  }

  update(order: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.orderDetailsRepository.delete(id);
  }
}
