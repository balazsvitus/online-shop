import { Body, Controller, Get, Put } from '@nestjs/common';
import StocksMapper from '../mapper/stock.mapper';
import { StocksService } from '../service/stocks.service';
import Stock from '../domain/stock.domain';
import StockDTO from '../dto/stock.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('stocks')
export class StockssController {
  constructor(
    private stocksMapper: StocksMapper,
    private stocksService: StocksService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Returns the product stock at a given location',
  })
  @Get()
  async getStocks(): Promise<Stock[]> {
    return await this.stocksService.getStocks();
  }

  @ApiResponse({
    status: 200,
    description:
      'The product stock at the given location was updated successfully',
  })
  @Put()
  async updateStock(@Body() stock: StockDTO): Promise<Stock> {
    return await this.stocksService.updateProduct(
      this.stocksMapper.dtoToStock(stock),
    );
  }
}
