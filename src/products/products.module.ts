import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategory from './domain/ProductCategory';
import Product from './domain/Product';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Product])],
})
export class ProductsModule {}
