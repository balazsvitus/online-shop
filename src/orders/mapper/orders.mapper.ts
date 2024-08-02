import { Injectable } from '@nestjs/common';
import OrderDTO from '../dto/order.dto';
import Order from '../domain/order.domain';
import Customer from '../../customers/domain/customer.domain';
import OrderDetailInDTO from '../dto/orderDetailIn.dto';
import OrderCheckoutDTO from '../dto/orderCheckout.dto';
import OrderDetailCheckoutDTO from '../dto/orderDetailsCheckout.dto';

@Injectable()
export default class OrdersMapper {
  orderToDto(order: Order, orderDetails: OrderDetailInDTO[]): OrderDTO {
    return new OrderDTO(
      order.customer.id,
      order.createdAt,
      order.country,
      order.city,
      order.county,
      order.streetAddress,
      orderDetails,
    );
  }

  orderToCheckoutDto(
    order: Order,
    orderDetails: OrderDetailCheckoutDTO[],
  ): OrderCheckoutDTO {
    return new OrderCheckoutDTO(
      order.customer.id,
      order.createdAt,
      order.country,
      order.city,
      order.county,
      order.streetAddress,
      orderDetails,
    );
  }

  dtoToOrder(orderDTO: OrderDTO | OrderCheckoutDTO, customer: Customer): Order {
    return new Order(
      customer,
      orderDTO.createdAt,
      orderDTO.country,
      orderDTO.city,
      orderDTO.county,
      orderDTO.streetAddress,
      [],
    );
  }
}
