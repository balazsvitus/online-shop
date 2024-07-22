import { Injectable } from '@nestjs/common';
import { StocksService } from '../../products/service/stocks.service';
import OrderDetailsRepository from '../repository/orderDetails.repository';
import OrderDetail from '../domain/orderDetail.domain';

@Injectable()
export class OrderDetailsService {
  constructor(
    private orderDetailsRepository: OrderDetailsRepository,
    private stocksService: StocksService,
  ) {}

  async validateOrderDetails(orderDetails: OrderDetail[]): Promise<boolean> {
    let ordersValid = true;
    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        const stock = await this.stocksService.getStock(
          orderDetail.productId,
          orderDetail.shippedFromId,
        );
        if (stock.quantity < orderDetail.quantity) {
          ordersValid = false;
        }
      }),
    );
    return ordersValid;
  }

  async decreaseStock(orderDetails: OrderDetail[]): Promise<void> {
    await this.stocksService.decreaseStock(orderDetails);
  }

  async saveOrderDetails(orderDetails: OrderDetail[]): Promise<void> {
    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        await this.orderDetailsRepository.save(orderDetail);
      }),
    );
  }
}
