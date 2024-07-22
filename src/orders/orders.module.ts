import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';
import OrderDetail from './domain/orderDetail.domain';
import Order from './domain/order.domain';
import OrdersRepository from './repository/orders.repository';
import OrdersMapper from './mapper/orders.mapper';
import { CustomersModule } from 'src/customers/customers.module';
import OrderDetailsMapper from './mapper/orderDetails.mapper';
import { OrderDetailsService } from './service/orderDetails.service';
import OrderDetailsRepository from './repository/orderDetails.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail, Order]),
    CustomersModule,
    ProductsModule,
  ],
  providers: [
    OrdersService,
    OrdersRepository,
    OrdersMapper,
    OrderDetailsService,
    OrderDetailsRepository,
    OrderDetailsMapper,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
