import { Injectable } from '@nestjs/common';
import StockDTO from '../dto/stock.dto';
import Stock from '../domain/stock.domain';

@Injectable()
export default class StocksMapper {
  dtoToStock(stockDTO: StockDTO): Stock {
    return new Stock(
      stockDTO.productId,
      stockDTO.locationId,
      stockDTO.quantity,
    );
  }

  stockToDto(stock: Stock): StockDTO {
    return new StockDTO(stock.productId, stock.locationId, stock.quantity);
  }
}
