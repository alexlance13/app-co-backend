import { getRepository } from 'typeorm';
import moment from 'moment';
import { ITables } from '../types';

function fromSnakeToCamelCase(string: string): string {
  return string.split('_').map((e) => e[0].toUpperCase() + e.slice(1)).join('');
}

export async function insertDataFromTheFiles(tables: ITables): Promise<void> {
  try {
    for (const [tableName, fileName] of Object.entries(tables)) {
      const { default: data } = await import(`../src/db/data/${fileName}.json`);

      await Promise.all(data.map(async (row) => {
        const repository = await getRepository(fromSnakeToCamelCase(tableName));
        const entity = repository.create(row);
        return repository.save(entity);
      }));
    }
  } catch (error) {
    console.error(`InsertingDataError: ${error}`);
  }
}

export function checkIsDateFormatValid(date: string): boolean {
  const newDate = date.split('%').join(' ');
  const allowedDateFormats = [moment.HTML5_FMT.DATE, moment.ISO_8601, moment.HTML5_FMT.DATETIME_LOCAL, moment.HTML5_FMT.DATETIME_LOCAL_MS,
    moment.HTML5_FMT.DATETIME_LOCAL_SECONDS, 'YYYY-MM-DD HH:MM', 'YYYY-MM-DD HH:MM:SS', 'YYYY-MM-DD HH:MM:SS.SSS'];
  return moment(newDate, allowedDateFormats, true).isValid();
}
