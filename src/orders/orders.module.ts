import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderDetail from './domain/OrderDetail';
import Order from './domain/Order';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Order])],
})
export class OrdersModule {}
