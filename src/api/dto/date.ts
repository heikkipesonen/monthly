import * as t from 'io-ts'
import { parseDate, toDateString } from 'src/utils/parser';

export class DateType extends t.Type<Date, string, unknown> {
  constructor() {
    super(
      'localDate',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        const v = t.string.validate(u, c)
        if (v.isLeft()) {
          return v as any
        } else {
          const d = parseDate(v.value)
          return d.map(x => t.success(x)).getOrElse(t.failure(u, c))
        }
      },
      x => toDateString(x)
    )
  }
}

export const DateField =  new DateType()