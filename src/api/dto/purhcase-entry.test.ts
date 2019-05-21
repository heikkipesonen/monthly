import { DraftPurchase } from "./purchase-entry";
import { Money } from 'src/utils/money';

describe('Purchase entry', () => {
  it('DRAFT: should decode items from objects', () => {
    const entry = DraftPurchase.decode({
      date: '18.04.2019',
      desc: '*Osto FIN VIHTI K supermarket Vihti',
      value: -37.6
    })

    expect(entry.isRight()).toEqual(true)

    const v = entry.value as DraftPurchase
    expect(v.date instanceof Date).toEqual(true)
    expect(v.value instanceof Money).toEqual(true)
  })

  it('DRAFT: should encode items to objects', () => {
    const entry = DraftPurchase.decode({
      date: '18.04.2019',
      desc: '*Osto FIN VIHTI K supermarket Vihti',
      value: -37.6
    }).value

    const raw = DraftPurchase.encode(entry as any)
    expect(typeof raw.value).toEqual('number')
    expect(typeof raw.date).toEqual('string')
  })


})