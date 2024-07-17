import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategory from './domain/ProductCategory';
import Product from './domain/Product';
import Stock from './domain/Stock';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Product, Stock])],
})
export class ProductsModule {}
