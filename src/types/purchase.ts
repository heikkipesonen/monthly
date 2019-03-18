import * as t from 'io-ts'
import { Money } from '../utils/money'
import { parseDate, extractKeywords, toDateString } from '../utils/parser'
import { some, none } from 'fp-ts/lib/Option';
import { generateId4 } from 'src/utils/id';

export const Entry = t.interface({
  desc: t.string,
  value: t.number,
  date: t.string,
  group: t.union([t.string, t.null])
})

export const EntryString = t.interface({
  id: t.string,
  desc: t.string,
  value: t.number,
  date: t.string,
  group: t.union([t.string, t.null])
})

export type EntryType = t.TypeOf<typeof Entry>

export class Purchase {
  constructor(
    public readonly desc: string,
    public readonly value: Money,
    public readonly date: Date,
    public readonly id: string = generateId4(),
    public readonly group: string | null  = null
  ) { }

  public containsKeyword = (word: string) => this.desc.toLowerCase().includes(word.toLowerCase())

  public matchOne = (keywords: string[]) =>
    keywords.some(this.containsKeyword)

  public matchAll = (keywords: string[]) =>
    keywords.every(this.containsKeyword)

  public keywords = () => extractKeywords(this.desc)

  public isBetween = (start: Date, end: Date) =>
    this.date.valueOf() <= end.valueOf() && this.date.valueOf() >= start.valueOf()

  public rowData = () => ({
    desc: this.desc,
    value: this.value.toString(),
    date: toDateString(this.date),
    group: this.group
  })

  public data = () => ({
    ...this.rowData(),
    id: this.id,
  })

  public toString = () => JSON.stringify(this.data())

  public setGroup = (group: string | null) =>
    new Purchase(
      this.desc,
      this.value,
      this.date,
      this.id,
      group
    )

  public isEqual = (p: Purchase) =>
    JSON.stringify(this.rowData()) === JSON.stringify(p.rowData())

  public static fromEntry = (item: EntryType) => {
    const date = parseDate(item.date).toNullable()
    const value = Money.from(item.value).toNullable()
    if (date && value) {
      return some(new Purchase(item.desc, value, date))
    }

    return none
  }

  public static fromModel= (s: object) =>
    EntryString.decode(s)
      .map(v => {
        const date = parseDate(v.date).toNullable()
        const value = Money.from(v.value).toNullable()
        if (date && value) {
          return some(new Purchase(v.desc, value, date, v.id, v.group))
        }

        return none
      })
      .getOrElseL(() => {
        console.log(s)
        throw new Error('e')
      })
}

