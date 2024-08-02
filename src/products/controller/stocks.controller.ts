import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import StocksMapper from '../mapper/stock.mapper';
import { StocksService } from '../service/stocks.service';
import StockDTO from '../dto/stock.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard/jwt-auth.guard';
import StockOutDTO from '../dto/stocksOutDto';
import ProductsMapper from '../mapper/product.mapper';
import LocationsMapper from 'src/locations/mapper/location.mapper';
import ProductCategoriesMapper from '../mapper/productCategory.mapper';

@Controller('stocks')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class StocksController {
  constructor(
    private stocksMapper: StocksMapper,
    private stocksService: StocksService,
    private productsMapper: ProductsMapper,
    private productCategoriesMapper: ProductCategoriesMapper,
    private locationsMapper: LocationsMapper,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Returns the product stock at a given location',
  })
  @Get()
  async getStocks(): Promise<StockOutDTO[]> {
    const stocks = await this.stocksService.getStocks();

    const stocksDto: StockOutDTO[] = [];
    stocks.map((stock) => {
      const productCategory =
        this.productCategoriesMapper.productCategoryToOutDto(
          stock.product.category,
        );
      const product = this.productsMapper.productToProductOutDto(
        stock.product,
        productCategory,
      );
      const location = this.locationsMapper.locationToOutDto(stock.location);
      stocksDto.push(this.stocksMapper.stockToOutDto(stock, product, location));
    });
    return stocksDto;
  }

  @ApiResponse({
    status: 200,
    description:
      'Returns a product stock at a given location for a given product',
  })
  @Get(':productId/:locationId')
  async getStock(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('locationId', ParseUUIDPipe) locationId: string,
  ): Promise<StockOutDTO> {
    const stock = await this.stocksService.getStock(productId, locationId);

    const productCategory =
      this.productCategoriesMapper.productCategoryToOutDto(
        stock.product.category,
      );
    const product = this.productsMapper.productToProductOutDto(
      stock.product,
      productCategory,
    );
    const location = this.locationsMapper.locationToOutDto(stock.location);

    return this.stocksMapper.stockToOutDto(stock, product, location);
  }

  @ApiResponse({
    status: 200,
    description:
      'The product stock at the given location was updated successfully',
  })
  @Put()
  async updateStock(@Body() stock: StockDTO): Promise<StockDTO> {
    return this.stocksMapper.stockToDto(
      await this.stocksService.updateStock(this.stocksMapper.dtoToStock(stock)),
    );
  }
}
