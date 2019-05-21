import * as t from 'io-ts'

export const PurchaseGroup = t.type({
  id: t.string,
  name: t.string,
})

export type PurchaseGroup = t.TypeOf<typeof PurchaseGroup>