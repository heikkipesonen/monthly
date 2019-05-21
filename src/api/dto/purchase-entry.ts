import * as t from 'io-ts'
import { Currency } from './money';
import { DateField } from './date';

export const Purchase = t.type({
  id: t.string,
  desc: t.string,
  value: Currency,
  date: DateField,
  group: t.union([t.string, t.null]),
  type: t.literal('PURCHASE')
})

export type Purchase = t.TypeOf<typeof Purchase>

export const DraftPurchase = t.type({
  desc: t.string,
  value: Currency,
  date: DateField,
  type: t.literal('DRAFT')
})

export type DraftPurchase = t.TypeOf<typeof DraftPurchase>

export type PurchaseItem = Purchase | DraftPurchase