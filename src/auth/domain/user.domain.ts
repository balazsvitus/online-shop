import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class User {
  @ApiProperty({ description: 'The username you wish to log in with' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  username: string;

  @ApiProperty({ description: 'The password you wish to log in with' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  password: string;
}
