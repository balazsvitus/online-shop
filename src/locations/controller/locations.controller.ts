import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { CsvService } from '../service/csv.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('locations')
export class LocationsController {
  constructor(private csvService: CsvService) {}

  @ApiResponse({ status: 200, description: 'Returns a location list' })
  @Get('available')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async getLocations() {
    try {
      const data = await this.csvService.fetchAndParseCSV(
        'https://raw.githubusercontent.com/catalin87/baza-de-date-localitati-romania/master/date/localitati.csv',
      );
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
