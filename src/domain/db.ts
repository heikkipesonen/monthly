import { api } from './api'
import { Purchase } from 'src/types/purchase';
import { firestore } from 'firebase'
import { PurchaseGroup } from 'src/types/purchase-group';

export const db = api.firestore()

export const purchases = db.collection('purchases')
export const groups = db.collection('groups')

export const updateEntries = (e: Purchase[]) => {
  const b = db.batch()
  e.map(i => b.set(purchases.doc(i.id), i.data))
  return b.commit()
}

const fromDbModel = (s: firestore.QueryDocumentSnapshot) => {
  const d = s.data()
  const id = s.id

  return Purchase.fromModel({
    id,
    desc: d.desc,
    value: d.value,
    date: d.date,
    group: d.group
  })
}

export const onGroupsUpdate = (cb: (d: PurchaseGroup[]) => void) => {
  groups.onSnapshot((s) => {
    cb(s.docs.map(g  => new PurchaseGroup(g.id, g.data().name)))
  })
}

export const onEntriesUpdate = (cb: (d: Purchase[]) => void) => {
  purchases.onSnapshot((s) => {
    cb(
      s.docs.map(
        d => fromDbModel(d).toNullable()
      ).filter(d => d !== null) as Purchase[]
    )
  })
}
