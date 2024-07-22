import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class CustomerInDTO {
  @ApiProperty({ description: 'The first name of the customer' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  firstName: string;
  @ApiProperty({ description: 'The last name of the customer' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  lastName: string;
  @ApiProperty({ description: 'The username of the customer' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  username: string;
  @ApiProperty({ description: 'The password of the customer' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  password: string;
  @ApiProperty({ description: 'The email address of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  emailAddress: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    emailAddress: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
  }
}
