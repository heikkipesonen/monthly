import { api } from './api'
// import { firestore } from 'firebase'
// import { PurchaseGroup } from 'src/types/purchase-group';

export const db = api.firestore()

export const purchases = db.collection('purchases')
export const groups = db.collection('groups')

// export const updateEntries = (e: Purchase[]) => {
//   const b = db.batch()
//   e.map(i => b.set(purchases.doc(i.id), i.data))
//   return b.commit()
// }


// export const onGroupsUpdate = (cb: (d: PurchaseGroup[]) => void) => {
//   groups.onSnapshot((s) => {
//     cb(s.docs.map(g  => new PurchaseGroup(g.id, g.data().name)))
//   })
// }

// const PurchaseEntry = t.type({
//   id: t.string,
//   desc: t.string,
//   value: t.number,
//   date: t.string,
//   group: t.union([t.string, t.null])
// })
// type PurchaseEntry = t.TypeOf<typeof PurchaseEntry>


// const toDomain = (model: unknown) =>
//   PurchaseEntry.decode(model).map(({ id, desc, value, date, group }): PurchaseEntryData => ({
//     id,
//     desc,
//     value: new Money(value),
//     date: parseDate(date).toNullable()!,
//     group: fromNullable(group)
//   }))

// const toRaw = ({ id, desc, value, date, group }: PurchaseEntryData): PurchaseEntry => ({
//   id,
//   desc,
//   value: value.valueOf(),
//   date: toDateString(date),
//   group: group.toNullable()
// })

// export const onEntriesUpdate = (cb: (d: Purchase[]) => void) => {
//   purchases.onSnapshot((s) => {
//     const list = s.docs.map(
//       d => Purchase.from({
//         id: d.id,
//         ...d.data()
//       })
//     )

//     const r: Purchase[] = []
//     list.forEach(i => i.map(e => r.push(e)))
//     cb(r)
//   })
// }
