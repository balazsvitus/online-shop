import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import ProductCategoriesMapper from '../mapper/productCategory.mapper';
import { ProductCategoriesService } from '../service/productCategories.service';
import ProductCategoryDTO from '../dto/productCatergory.dto';
import { ProductsService } from '../service/products.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('product-categories')
@UseGuards(JwtGuard)
export class ProductCategoriesController {
  constructor(
    private productCategoriesMapper: ProductCategoriesMapper,
    private productCategoriesService: ProductCategoriesService,
    private productsService: ProductsService,
  ) {}

  @ApiResponse({ status: 200, description: 'Returns the product categories' })
  @Get()
  async getProducts(): Promise<ProductCategoryDTO[]> {
    const productCategories =
      await this.productCategoriesService.getProductCategories();

    const productCategoriesDto: ProductCategoryDTO[] = [];
    productCategories.map((productCategory) => {
      productCategoriesDto.push(
        this.productCategoriesMapper.productCategoryToDto(productCategory),
      );
    });
    return productCategoriesDto;
  }

  @ApiResponse({ status: 200, description: 'Returns the product category' })
  @ApiResponse({
    status: 404,
    description: "The product category can't be found",
  })
  @Get(':id')
  async getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductCategoryDTO | null> {
    const productCategory =
      await this.productCategoriesService.getProductCategoryById(id);
    return this.productCategoriesMapper.productCategoryToDto(productCategory);
  }

  @ApiResponse({
    status: 201,
    description: 'The product category was created successfully',
  })
  @Post()
  async createProduct(
    @Body() productCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategoryDTO> {
    return this.productCategoriesMapper.productCategoryToDto(
      await this.productCategoriesService.createProductCategory(
        this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO),
      ),
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategoryDTO> {
    const productCategory =
      this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO);
    productCategory.id = id;

    return this.productCategoriesMapper.productCategoryToDto(
      await this.productCategoriesService.updateProductCategory(
        productCategory,
      ),
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
  async removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    await this.productCategoriesService.removeProductCategory(id);
  }
}
