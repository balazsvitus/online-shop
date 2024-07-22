import { ApiProperty } from '@nestjs/swagger';

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

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    emailAddress: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.emailAddress = emailAddress;
  }
}
