import { none, some } from 'fp-ts/lib/Option';

export class Money {
  constructor(
    private readonly value: number
  ) {}

  public valueOf() {
    return this.value/100
  }

  public displayValue() {
    return (this.value / 100).toFixed(2)
  }

  public static from = (value: string | number) => {
    const v = Number(`${value}`.replace(",", "."))

    if (isNaN(v)) {
      return none
    }

    return some(
      new Money(Math.round(v * 100))
    )
  }

  public add = (m: Money) => new Money(this.value + m.value)
}