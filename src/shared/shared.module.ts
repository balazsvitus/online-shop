import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Location from '../products/domain/location.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
})
export class SharedModule {}
