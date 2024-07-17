import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';
import OrderDetail from './domain/orderDetail.domain';
import Order from './domain/order.domain';
import OrdersRepository from './repository/orders.repository';
import OrdersMapper from './mapper/orders.mapper';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Order]), CustomersModule],
  providers: [OrdersService, OrdersRepository, OrdersMapper],
  controllers: [OrdersController],
})
export class OrdersModule {}
