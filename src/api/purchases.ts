import { purchases } from './db';
import { Purchase, DraftPurchase } from './dto/purchase-entry';

export const updatePurchase = (item: Purchase) =>
  purchases.doc(item.id).set(Purchase.encode(item))

export const addPurchases = (items: DraftPurchase[]) =>
  items.map(item => purchases.add({
    ...DraftPurchase.decode(item),
    type: 'PURCHASE'
  }))

export const onPurchaseChange = (cb: (d: Purchase[]) => void) => {
  purchases.onSnapshot((s) => {
    const r: Purchase[] = []
    s.docs.map(
      d => Purchase.decode({
        id: d.id,
        ...d.data(),
        type: 'PURCHASE'
      })
      .map(x => r.push(x) )
    )

    cb(r)
  })
}
