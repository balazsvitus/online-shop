import { Injectable } from '@nestjs/common';
import StockDTO from '../dto/stock.dto';
import Stock from '../domain/stock.domain';
import StockOutDTO from '../dto/stocksOutDto';
import ProductOutDTO from '../dto/productOut.dto';
import LocationOutDTO from 'src/locations/dto/locationOut.dto';

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

  stockToOutDto(
    stock: Stock,
    product: ProductOutDTO,
    location: LocationOutDTO,
  ): StockOutDTO {
    return new StockOutDTO(product, location, stock.quantity);
  }
}
