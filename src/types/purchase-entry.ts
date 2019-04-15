import * as t from 'io-ts'
import { purchases } from 'src/domain/db';

export const Entry = t.interface({
  desc: t.string,
  value: t.number,
  date: t.string,
  group: t.union([t.string, t.null])
})

export type EntryType = t.TypeOf<typeof Entry>


export class PurhcaseEntry {
  constructor(
    public readonly desc: string,
    public readonly value: number,
    public readonly date: string,
    public readonly group: string | null = null,
    public readonly kind = 'entry'
  ) { }

  public save() {
    return purchases.add(this.data)
  }

  public data = () => ({
    desc: this.desc,
    value: this.value,
    date: this.date,
    group: this.group
  })

  public static from = (o: object) =>
    Entry.decode(o).map(e => new PurhcaseEntry(e.desc, e.value, e.date, e.group))

}