import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategory from './products/domain/productCategory.domain';
import Location from './shared/domain/Location';
import Product from './products/domain/product.domain';
import Customer from './customers/domain/customer.domain';
import Order from './orders/domain/order.domain';
import OrderDetail from './orders/domain/orderDetail.domain';
import Stock from './products/domain/Stock';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    CustomersModule,
    SharedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'msgcsuser',
      password: 'msgcspass',
      database: 'msgcsdb',
      synchronize: true,
      entities: [
        ProductCategory,
        Location,
        Product,
        Customer,
        Order,
        OrderDetail,
        Stock,
      ],
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
