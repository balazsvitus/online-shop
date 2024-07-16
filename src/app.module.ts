import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [OrdersModule, ProductsModule, CustomersModule, SharedModule],
  controllers: [HealthController],
})
export class AppModule {}
