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
import ProductsMapper from '../mapper/product.mapper';
import { ProductsService } from '../service/products.service';
import ProductDTO from '../dto/product.dto';
import ProductCategory from '../domain/productCategory.domain';
import { ProductCategoriesService } from '../service/productCategories.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtGuard)
export class ProductsController {
  constructor(
    private productsMapper: ProductsMapper,
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
  ) {}

  @ApiResponse({ status: 200, description: 'Returns the products' })
  @Get()
  async getProducts(): Promise<ProductDTO[]> {
    const products = await this.productsService.getProducts();

    const productsDTO: ProductDTO[] = [];
    products.map((product) => {
      productsDTO.push(this.productsMapper.productToDto(product));
    });
    return productsDTO;
  }

  @ApiResponse({ status: 200, description: 'Returns the product' })
  @ApiResponse({ status: 404, description: "The product can't be found" })
  @Get(':id')
  async getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductDTO | null> {
    const product = await this.productsService.getProductById(id);
    return this.productsMapper.productToDto(product);
  }

  @ApiResponse({
    status: 201,
    description: 'The product was created successfully',
  })
  @Post()
  async createProduct(@Body() productDTO: ProductDTO): Promise<ProductDTO> {
    const productCategory: ProductCategory =
      await this.productCategoriesService.getProductCategoryById(
        productDTO.category,
      );

    return this.productsMapper.productToDto(
      await this.productsService.createProduct(
        this.productsMapper.dtoToProduct(productDTO, productCategory),
      ),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'The product was updated successfully',
  })
  @ApiResponse({ status: 404, description: "The product can't be found" })
  @Put(':id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productDTO: ProductDTO,
  ): Promise<ProductDTO> {
    const productCategory: ProductCategory =
      await this.productCategoriesService.getProductCategoryById(
        productDTO.category,
      );
    const product = this.productsMapper.dtoToProduct(
      productDTO,
      productCategory,
    );
    product.id = id;

    console.log('1', product);

    return this.productsMapper.productToDto(
      await this.productsService.updateProduct(product),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'The product was deleted successfully',
  })
  @ApiResponse({ status: 404, description: "The product can't be found" })
  @Delete(':id')
  async removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    await this.productsService.removeProduct(id);
  }
}
