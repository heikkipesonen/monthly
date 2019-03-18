import * as t from 'io-ts'
import { generateId4 } from 'src/utils/id';

export const PurchaseGroupType = t.interface({
  id: t.string,
  name: t.string,
})

export class PurchaseGroup {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) { }

  public static create = (name: string) => new PurchaseGroup(
    generateId4(),
    name
  )
}