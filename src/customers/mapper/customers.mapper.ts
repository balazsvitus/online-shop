import { Injectable } from '@nestjs/common';
import CustomerDTO from '../dto/CustomerDTO';
import Customer from '../domain/Customer';

@Injectable()
export default class CustomersMapper {
  customerToDto(customer: Customer): CustomerDTO {
    return new CustomerDTO(
      customer.firstName,
      customer.lastName,
      customer.username,
      customer.password,
      customer.emailAddress,
    );
  }

  dtoToCustomer(customerDTO: CustomerDTO): Customer {
    return new Customer(
      customerDTO.firstName,
      customerDTO.lastName,
      customerDTO.username,
      customerDTO.password,
      customerDTO.emailAddress,
    );
  }
}
