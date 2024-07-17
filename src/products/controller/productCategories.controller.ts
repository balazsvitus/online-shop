import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import ProductCategoriesMapper from '../mapper/productCategory.mapper';
import { ProductCategoriesService } from '../service/productCategories.service';
import ProductCategory from '../domain/productCategory.domain';
import ProductCategoryDTO from '../dto/productCatergory.dto';

@Controller('productCategories')
export class ProductCategoriesController {
  constructor(
    private productCategoriesMapper: ProductCategoriesMapper,
    private productCategoriesService: ProductCategoriesService,
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
      this.productCategoriesMapper.dtoToProductCategory(productCategoryDTO, []),
    );
  }

  // @Put(':id')
  // async updateProduct(
  //   @Param() { id }: { id: string },
  //   @Body() orderDTO: ProductDTO,
  // ): Promise<Product> {
  //   const customer = await this.customersService.getCustomerById(
  //     orderDTO.customer,
  //   );
  //   const order = this.productsMapper.dtoToProduct(orderDTO, customer);
  //   order.id = id;
  //   return await this.productsService.updateProduct(order);
  // }

  // @Delete(':id')
  // async removeProduct(@Param() { id }: { id: string }) {
  //   await this.productsService.removeProduct(id);
  // }
}
