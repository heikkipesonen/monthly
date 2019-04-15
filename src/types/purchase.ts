import * as t from 'io-ts'
import { Money } from '../utils/money'
import { parseDate, extractKeywords, toDateString } from '../utils/parser'
import { some, none } from 'fp-ts/lib/Option';
import { purchases } from 'src/domain/db';

export const EntryString = t.interface({
  id: t.string,
  desc: t.string,
  value: t.number,
  date: t.string,
  group: t.union([t.string, t.null])
})

export type EntryStringType = t.TypeOf<typeof EntryString>

export class Purchase {
  constructor(
    public readonly id: string,
    public readonly desc: string,
    public readonly value: Money,
    public readonly date: Date,
    public readonly group: string | null = null,
    public readonly kind = 'purchase'
  ) { }

  public containsKeyword = (word: string) => this.desc.toLowerCase().includes(word.toLowerCase())

  public keywords = () => extractKeywords(this.desc)

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

  public update = async (data: Partial<EntryStringType>) => {
    await purchases.doc(this.id).update({
      ...this.data(),
      ...data
    })

    return Purchase.fromModel({
      ...this.data(),
      ...data
    })
  }

  public isEqual = (p: Purchase) => {
    const a = this.rowData()
    const b = p.rowData()
    return a.desc === b.desc && a.value === b.value && a.date === b.date
  }

  public static fromModel= (s: object) =>
    EntryString.decode(s)
      .map(v => {
        const date = parseDate(v.date).toNullable()
        const value = Money.from(v.value).toNullable()
        if (date && value) {
          return some(new Purchase(v.id, v.desc, value, date, v.group))
        }

        return none
      })
      .getOrElseL(() => {
        console.log(s)
        throw new Error('e')
      })

}

