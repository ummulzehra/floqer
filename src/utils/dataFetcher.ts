// src/utils/dataFetcher.ts
import Papa from 'papaparse';
import { SalaryData } from './types'; // Import the SalaryData interface

export const fetchData = async (): Promise<SalaryData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse('/data/your_dataset.csv', {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data as SalaryData[]); // Cast results.data to SalaryData[]
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
