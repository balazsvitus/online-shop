import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor() {}

  @ApiResponse({
    status: 200,
    description: 'Dummy endpoint, always returns 200 OK',
  })
  @Get()
  getHealth(): string {
    return 'UP';
  }
}
