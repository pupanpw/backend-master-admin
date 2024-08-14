import * as moment from 'moment';

import { SelectQueryBuilder } from 'typeorm';

export function dateToString(date: Date, format = 'YYYY-MM-DD') {
  if (!date) return '';

  return moment(date).format(format);
}

export function convertNumberFormat(number: number, toFixed = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: toFixed,
  }).format(number);
}

export function searchCondition<Entity>(
  fields: string[],
  search: string,
): (qb: SelectQueryBuilder<Entity>) => void {
  return (qb: SelectQueryBuilder<Entity>) => {
    fields.forEach((field) => {
      qb.orWhere(`LOWER(${field}) LIKE :search`, {
        search: `%${search.toLowerCase()}%`,
      });
    });
  };
}
