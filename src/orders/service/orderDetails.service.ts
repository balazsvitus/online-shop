import { Injectable } from '@nestjs/common';
import OrderDetailInDTO from '../dto/orderDetail.indto';
import { StocksService } from 'src/products/service/stocks.service';
import OrderDetailsRepository from '../repository/orderDetails.repository';
import OrderDetail from '../domain/orderDetail.domain';

@Injectable()
export class OrderDetailsService {
  constructor(
    private orderDetailsRepository: OrderDetailsRepository,
    private stocksService: StocksService,
  ) {}

  async validateOrderDetails(
    orderDetails: OrderDetailInDTO[],
  ): Promise<boolean> {
    let ordersValid = true;
    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        const stock = await this.stocksService.getStock(
          orderDetail.productId,
          orderDetail.shippedFrom,
        );
        if (stock.quantity < orderDetail.quantity) {
          ordersValid = false;
        }
      }),
    );
    return ordersValid;
  }

  async decreaseStock(orderDetails: OrderDetailInDTO[]): Promise<void> {
    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        await this.stocksService.decreaseStock(
          orderDetail.productId,
          orderDetail.shippedFrom,
          orderDetail.quantity,
        );
      }),
    );
  }

  async saveOrderDetails(orderDetails: OrderDetail[]): Promise<void> {
    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        await this.orderDetailsRepository.save(orderDetail);
      }),
    );
  }
}
