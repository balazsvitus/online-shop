import { Injectable } from '@nestjs/common';
import OrderDetailInDTO from '../dto/orderDetailIn.dto';
import OrderDetail from '../domain/orderDetail.domain';
import OrderDetailCheckoutDTO from '../dto/orderDetailsCheckout.dto';

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

  checkoutDtosToOrderDetails(
    orderDetailDTOs: OrderDetailCheckoutDTO[],
  ): OrderDetail[] {
    const orderDetails: OrderDetail[] = [];

    orderDetailDTOs.map((orderDetailDTO) => {
      orderDetails.push(
        new OrderDetail(
          '',
          orderDetailDTO.productId,
          '',
          orderDetailDTO.quantity,
        ),
      );
    });

    return orderDetails;
  }
}
