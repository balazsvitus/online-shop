import { ApiProperty } from '@nestjs/swagger';
import { CustomerRole } from '../domain/customer.domain';

export default class CustomerOutDTO {
  @ApiProperty({ description: 'The ID of the customer' })
  id: string;
  @ApiProperty({ description: 'The first name of the customer' })
  firstName: string;
  @ApiProperty({ description: 'The last name of the customer' })
  lastName: string;
  @ApiProperty({ description: 'The username of the customer' })
  username: string;
  @ApiProperty({ description: 'The email address of the user' })
  emailAddress: string;
  @ApiProperty({ description: 'The role of the customer' })
  role: CustomerRole;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    emailAddress: string,
    role: CustomerRole,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.emailAddress = emailAddress;
    this.role = role;
  }
}
