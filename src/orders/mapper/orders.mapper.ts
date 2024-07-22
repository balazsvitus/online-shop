import { Injectable } from '@nestjs/common';
import OrderDTO from '../dto/order.dto';
import Order from '../domain/order.domain';
import Customer from '../../customers/domain/customer.domain';
import OrderDetailInDTO from '../dto/orderDetail.indto';

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

  dtoToOrder(orderDTO: OrderDTO, customer: Customer): Order {
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
