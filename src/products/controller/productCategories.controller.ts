import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ProductCategoriesMapper from '../mapper/productCategory.mapper';
import { ProductCategoriesService } from '../service/productCategories.service';
import ProductCategory from '../domain/productCategory.domain';
import ProductCategoryDTO from '../dto/productCatergory.dto';
import { ProductsService } from '../service/products.service';

@Controller('productCategories')
export class ProductCategoriesController {
  constructor(
    private productCategoriesMapper: ProductCategoriesMapper,
    private productCategoriesService: ProductCategoriesService,
    private productsService: ProductsService,
  ) {}

  @Get()
  async getProducts(): Promise<ProductCategory[]> {
    return await this.productCategoriesService.getProductCategories();
  }

  @Get(':id')
  async getProductById(
    @Param() { id }: { id: string },
  ): Promise<ProductCategory | null> {
    return await this.productCategoriesService.getProductCategoryById(id);
  }

  @Post()
  async createProduct(
    @Body() productCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategory> {
    return await this.productCategoriesService.createProductCategory(
      this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO),
    );
  }

  @Put(':id')
  async updateProduct(
    @Param() { id }: { id: string },
    @Body() productCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory =
      this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO);
    productCategory.id = id;
    return await this.productCategoriesService.updateProductCategory(
      productCategory,
    );
  }

  @Delete(':id')
  async removeProduct(@Param() { id }: { id: string }) {
    await this.productCategoriesService.removeProductCategory(id);
  }
}
