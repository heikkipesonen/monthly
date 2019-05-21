import { PurchaseItem } from 'src/api/dto/purchase-entry';

export const sortPurchases = <T extends PurchaseItem[]>(items: T) =>
  items.sort((a, b) => a.date > b.date ? -1 : 1) as T


const isDuplicate = (a: PurchaseItem, b: PurchaseItem) =>
  a.desc === b.desc &&
  a.date.valueOf() === b.date.valueOf() &&
  a.value.valueOf() === b.value.valueOf()

export const existsInList = (item: PurchaseItem, items: PurchaseItem[]) => items.some(i => isDuplicate(item, i))