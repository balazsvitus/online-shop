import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(
    private productsMapper: ProductsMapper,
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
  ) {}

  @ApiResponse({ status: 200, description: 'Returns the products' })
  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @ApiResponse({ status: 200, description: 'Returns the product' })
  @ApiResponse({ status: 404, description: "The product can't be found" })
  @Get(':id')
  async getProductById(
    @Param() { id }: { id: string },
  ): Promise<Product | null> {
    const product = await this.productsService.getProductById(id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  @ApiResponse({
    status: 201,
    description: 'The product was created successfully',
  })
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

  @ApiResponse({
    status: 200,
    description: 'The product was updated successfully',
  })
  @ApiResponse({ status: 404, description: "The product can't be found" })
  @Put(':id')
  async updateProduct(
    @Param() { id }: { id: string },
    @Body() productDTO: ProductDTO,
  ): Promise<Product> {
    const checkProduct = this.productsService.getProductById(id);
    if (!checkProduct) {
      throw new NotFoundException();
    }
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

  @ApiResponse({
    status: 200,
    description: 'The product was deleted successfully',
  })
  @ApiResponse({ status: 404, description: "The product can't be found" })
  @Delete(':id')
  async removeProduct(@Param() { id }: { id: string }) {
    const checkProduct = this.productsService.getProductById(id);
    if (!checkProduct) {
      throw new NotFoundException();
    }
    await this.productsService.removeProduct(id);
  }
}
