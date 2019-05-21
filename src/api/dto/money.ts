import * as t from 'io-ts'
import { Money } from 'src/utils/money';

export class CurrencyType extends t.Type<Money, number, unknown> {
  constructor() {
    super(
      'Money',
      (u): u is Money => u instanceof Money,
      (u, c) => {
        const v = t.number.validate(u, c)
        if (v.isLeft()) {
          return v as any
        } else {
          return Money.from(v.value).map(t.success).getOrElse(t.failure(u, c))
        }
      },
      x => x.valueOf(),
    )
  }
}

export const Currency = new CurrencyType()
