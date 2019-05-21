import { isSameMonth } from 'date-fns';
import { PurchaseItem, Purchase } from './api/dto/purchase-entry';
import { PurchaseGroup } from './api/dto/purchase-group';
import { sortPurchases } from './utils/sort';

interface State {
  items: PurchaseItem[]
  filtered: PurchaseItem[]
  groups: PurchaseGroup[]
}

type Action = {
  type: 'SET_ITEMS',
  payload: PurchaseItem[]
} | {
  type: 'SET_GROUPS',
  payload: PurchaseGroup[]
} | {
  type: 'DATE_FILTER',
  payload: Date
}

export const initialState: State = {
  items: [],
  filtered: [],
  groups: []
}

const filterByDate = (items: PurchaseItem[], d: Date) =>
  items.filter(x => isSameMonth(x.date, d))


const setDateFilter = (d: Date) => (s: State) => {
  const filtered = filterByDate(s.items, d)
  return {
    ...s,
    monthFilter: d,
    filtered
  }
}

export const getGroupItems = (g: PurchaseGroup, state: State) =>
  sortPurchases(
    state.items.filter(i => i.type === 'PURCHASE' && i.group === g.id) as Purchase[]
  )

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      }
    case 'SET_GROUPS':
      return {
        ...state,
        groups: action.payload,
      }
    case 'DATE_FILTER':
      return setDateFilter(action.payload)(state)
    default:
      return state
  }
}