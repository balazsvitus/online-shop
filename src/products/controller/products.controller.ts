import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ProductsMapper from '../mapper/product.mapper';
import { ProductsService } from '../service/products.service';
import Product from '../domain/product.domain';
import ProductDTO from '../dto/product.dto';
import ProductCategory from '../domain/productCategory.domain';
import { ProductCategoriesService } from '../service/productCategories.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsMapper: ProductsMapper,
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
  ) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(
    @Param() { id }: { id: string },
  ): Promise<Product | null> {
    return await this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() productDTO: ProductDTO): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoriesService.getProductCategoryById(
        productDTO.category,
      );

    return await this.productsService.createProduct(
      this.productsMapper.dtoToProduct(productDTO, productCategory),
    );
  }

  @Put(':id')
  async updateProduct(
    @Param() { id }: { id: string },
    @Body() productDTO: ProductDTO,
  ): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoriesService.getProductCategoryById(
        productDTO.category,
      );
    const product = this.productsMapper.dtoToProduct(
      productDTO,
      productCategory,
    );
    product.id = id;

    return await this.productsService.createProduct(product);
  }

  @Delete(':id')
  async removeProduct(@Param() { id }: { id: string }) {
    await this.productsService.removeProduct(id);
  }
}
