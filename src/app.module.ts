import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategory from './products/domain/ProductCategory';
import Location from './shared/domain/Location';
import Product from './products/domain/Product';
import Customer from './customers/domain/Customer';
import Order from './orders/domain/Order';
import OrderDetail from './orders/domain/OrderDetail';

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
      ],
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
