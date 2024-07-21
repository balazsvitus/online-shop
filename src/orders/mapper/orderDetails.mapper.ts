import { Injectable } from '@nestjs/common';
import OrderDetailInDTO from '../dto/orderDetail.indto';
import OrderDetail from '../domain/orderDetail.domain';

@Injectable()
export default class OrderDetailsMapper {
  orderDetailToDto(orderDetail: OrderDetail): OrderDetailInDTO {
    return new OrderDetailInDTO(
      orderDetail.productId,
      orderDetail.shippedFromId,
      orderDetail.quantity,
    );
  }

  orderDetailsToDtos(orderDetails: OrderDetail[]): OrderDetailInDTO[] {
    const orderDetailDTOs: OrderDetailInDTO[] = [];

    orderDetails.map((orderDetail) => {
      orderDetailDTOs.push(
        new OrderDetailInDTO(
          orderDetail.productId,
          orderDetail.shippedFromId,
          orderDetail.quantity,
        ),
      );
    });

    return orderDetailDTOs;
  }

  inDtoToOrderDetail(
    orderId: string,
    orderDetailDTOs: OrderDetailInDTO,
  ): OrderDetail {
    return new OrderDetail(
      orderId,
      orderDetailDTOs.productId,
      orderDetailDTOs.shippedFrom,
      orderDetailDTOs.quantity,
    );
  }

  inDtosToOrderDetails(
    orderId: string,
    orderDetailDTOs: OrderDetailInDTO[],
  ): OrderDetail[] {
    const orderDetails: OrderDetail[] = [];

    orderDetailDTOs.map((orderDetailDTO) => {
      orderDetails.push(
        new OrderDetail(
          orderId,
          orderDetailDTO.productId,
          orderDetailDTO.shippedFrom,
          orderDetailDTO.quantity,
        ),
      );
    });

    return orderDetails;
  }
}
