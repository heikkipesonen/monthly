import { groups } from './db';
import { PurchaseGroup } from './dto/purchase-group';

export const onGroupChange = (cb: (d: PurchaseGroup[]) => void) => {
  groups.onSnapshot((s) => {
    const r: PurchaseGroup[] = []
    s.docs.map(
      d => PurchaseGroup.decode({
        id: d.id,
        ...d.data()
      })
        .map(x => r.push(x))
    )

    cb(r)
  })
}
