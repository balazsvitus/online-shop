// src/csv/csv.service.ts
import { Injectable } from '@nestjs/common';
import { parse } from 'fast-csv';
import { Readable } from 'stream';
import axios from 'axios';
import { LocationSuggestionDTO } from '../dto/location-suggestion.dto';

@Injectable()
export class CsvService {
  constructor() {}

  async fetchAndParseCSV(url: string): Promise<any[]> {
    const results: LocationSuggestionDTO[] = [];

    try {
      // Fetch the CSV data using axios
      const response = await axios.get(url, {
        responseType: 'stream',
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const body: Readable = response.data;

      // Parse the CSV data
      return new Promise((resolve, reject) => {
        body
          .pipe(parse({ headers: true })) // Use headers from the CSV
          .on('data', (row) => {
            const filteredRow: LocationSuggestionDTO =
              new LocationSuggestionDTO(row.id, row.nume, row.judet, 'Romania');
            results.push(filteredRow);
          })
          .on('end', () => resolve(results))
          .on('error', (error: Error) => reject(error));
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
      throw error;
    }
  }
}
