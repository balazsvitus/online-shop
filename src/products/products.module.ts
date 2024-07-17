import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import ProductCategory from './domain/productCategory.domain';
import Product from './domain/product.domain';
import Stock from './domain/stock.domain';
import ProductsRepository from './repository/products.repository';
import ProductsMapper from './mapper/product.mapper';
import { ProductCategoriesController } from './controller/productCategories.controller';
import { ProductCategoriesService } from './service/productCategories.service';
import ProductCategoriesRepository from './repository/productCategories.repository';
import ProductCategoriesMapper from './mapper/productCategory.mapper';
import { StocksService } from './service/stocks.service';
import StocksRepository from './repository/stock.repository';
import StocksMapper from './mapper/stock.mapper';
import { StockssController } from './controller/stocks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Product, Stock])],
  controllers: [
    ProductsController,
    ProductCategoriesController,
    StockssController,
  ],
  providers: [
    ProductsService,
    ProductsRepository,
    ProductsMapper,
    ProductCategoriesService,
    ProductCategoriesRepository,
    ProductCategoriesMapper,
    StocksService,
    StocksRepository,
    StocksMapper,
  ],
})
export class ProductsModule {}
