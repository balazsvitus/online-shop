import { Injectable } from '@nestjs/common';
import CustomerInDTO from '../dto/customerIn.dto';
import Customer from '../domain/customer.domain';
import CustomerOutDTO from '../dto/customerOut.dto';

@Injectable()
export default class CustomersMapper {
  customerToInDto(customer: Customer): CustomerInDTO {
    return new CustomerInDTO(
      customer.firstName,
      customer.lastName,
      customer.username,
      customer.password,
      customer.emailAddress,
    );
  }

  inDtoToCustomer(customerDTO: CustomerInDTO): Customer {
    return new Customer(
      customerDTO.firstName,
      customerDTO.lastName,
      customerDTO.username,
      customerDTO.password,
      customerDTO.emailAddress,
    );
  }

  customerToOutDto(customer: Customer): CustomerOutDTO {
    return new CustomerOutDTO(
      customer.id,
      customer.firstName,
      customer.lastName,
      customer.username,
      customer.emailAddress,
    );
  }
}
