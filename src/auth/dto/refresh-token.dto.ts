import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RefreshToken {
  @ApiProperty({
    description: 'The refresh token you wish to use for your new access token',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  refresh: string;
}
