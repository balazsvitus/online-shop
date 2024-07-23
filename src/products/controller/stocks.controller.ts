import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import StocksMapper from '../mapper/stock.mapper';
import { StocksService } from '../service/stocks.service';
import StockDTO from '../dto/stock.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('stocks')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class StocksController {
  constructor(
    private stocksMapper: StocksMapper,
    private stocksService: StocksService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Returns the product stock at a given location',
  })
  @Get()
  async getStocks(): Promise<StockDTO[]> {
    const stocks = await this.stocksService.getStocks();

    const stocksDto: StockDTO[] = [];
    stocks.map((stock) => {
      stocksDto.push(this.stocksMapper.stockToDto(stock));
    });
    return stocksDto;
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
