import * as t from 'io-ts'
import { groups } from 'src/domain/db';

export const PurchaseGroupType = t.interface({
  id: t.string,
  name: t.string,
})

export class PurchaseGroup {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) { }

  public save = () =>
    groups.doc(this.id).update({
      name: this.name
    })

  public static create = async (name: string) => {
    const g = await groups.add({ name })
    return new PurchaseGroup(g.id, name)
  }

}