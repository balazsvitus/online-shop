import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Location from './domain/Location';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
})
export class SharedModule {}
