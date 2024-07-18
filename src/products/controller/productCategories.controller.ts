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
import ProductCategoriesMapper from '../mapper/productCategory.mapper';
import { ProductCategoriesService } from '../service/productCategories.service';
import ProductCategory from '../domain/productCategory.domain';
import ProductCategoryDTO from '../dto/productCatergory.dto';
import { ProductsService } from '../service/products.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('productCategories')
export class ProductCategoriesController {
  constructor(
    private productCategoriesMapper: ProductCategoriesMapper,
    private productCategoriesService: ProductCategoriesService,
    private productsService: ProductsService,
  ) {}

  @ApiResponse({ status: 200, description: 'Returns the product categories' })
  @Get()
  async getProducts(): Promise<ProductCategory[]> {
    return await this.productCategoriesService.getProductCategories();
  }

  @ApiResponse({ status: 200, description: 'Returns the product category' })
  @ApiResponse({
    status: 404,
    description: "The product category can't be found",
  })
  @Get(':id')
  async getProductById(
    @Param() { id }: { id: string },
  ): Promise<ProductCategory | null> {
    const productCategory =
      await this.productCategoriesService.getProductCategoryById(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  @ApiResponse({
    status: 201,
    description: 'The product category was created successfully',
  })
  @Post()
  async createProduct(
    @Body() productCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategory> {
    return await this.productCategoriesService.createProductCategory(
      this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'The product category was updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: "The product category can't be found",
  })
  @Put(':id')
  async updateProduct(
    @Param() { id }: { id: string },
    @Body() productCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategory> {
    const checkProductCategory =
      this.productCategoriesService.getProductCategoryById(id);
    if (!checkProductCategory) {
      throw new NotFoundException();
    }
    const productCategory =
      this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO);
    productCategory.id = id;
    return await this.productCategoriesService.updateProductCategory(
      productCategory,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'The product category was deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: "The product category can't be found",
  })
  @Delete(':id')
  async removeProduct(@Param() { id }: { id: string }) {
    const checkProductCategory =
      this.productCategoriesService.getProductCategoryById(id);
    if (!checkProductCategory) {
      throw new NotFoundException();
    }
    await this.productCategoriesService.removeProductCategory(id);
  }
}
