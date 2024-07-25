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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard/jwt-auth.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { CustomerRole } from '../../customers/enum/customerRole.enum';

@Controller('products')
@UseGuards(JwtGuard)
@ApiBearerAuth()
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
  @UseGuards(RolesGuard)
  @Roles([CustomerRole.ADMIN])
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
  @UseGuards(RolesGuard)
  @Roles([CustomerRole.ADMIN])
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
  @UseGuards(RolesGuard)
  @Roles([CustomerRole.ADMIN])
  async removeProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.productsService.removeProduct(id);
  }
}
