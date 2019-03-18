import * as React from 'react'
import { Purchase } from 'src/types/purchase';

const KEY = 'items'

export const setDataTransfer = (e: React.DragEvent<any>, items: Purchase[]) =>
  e.dataTransfer.setData(KEY, JSON.stringify(items.map(i => i.data())))

export const getDataTransfer = (e: React.DragEvent<any>): Purchase[] => {
  const items = JSON.parse(e.dataTransfer.getData(KEY)) as object[]
  const result: Purchase[] = []
  items.forEach(i => Purchase.fromModel(i).map(item => result.push(item)))

  return result
}