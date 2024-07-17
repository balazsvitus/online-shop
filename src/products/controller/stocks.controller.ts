import { Body, Controller, Get, Put } from '@nestjs/common';
import StocksMapper from '../mapper/stock.mapper';
import { StocksService } from '../service/stocks.service';
import Stock from '../domain/stock.domain';
import StockDTO from '../dto/stock.dto';

@Controller('stocks')
export class StockssController {
  constructor(
    private stocksMapper: StocksMapper,
    private stocksService: StocksService,
  ) {}

  @Get()
  async getStocks(): Promise<Stock[]> {
    return await this.stocksService.getStocks();
  }

  @Put()
  async updateStock(@Body() stock: StockDTO): Promise<Stock> {
    return await this.stocksService.updateProduct(
      this.stocksMapper.dtoToStock(stock),
    );
  }
}
