import { Module } from '@nestjs/common';
import { SeederService } from './service/seederService.service';

@Module({
  providers: [SeederService],
})
export class SharedModule {}
