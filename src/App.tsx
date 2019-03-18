import * as React from 'react';

import styled from 'styled-components'
import { Purchase } from './types/purchase';

import './index.css'
import { PurhcaseList } from './components/purchase-list';
import { PurchaseGroup } from './types/purchase-group';
import { PurchaseGroupEl } from './components/purchase-group';

import { AddGroup } from './components/add-group-modal';
import { Input } from './components/input';
import { Button } from './components/button';
import { Row } from './components/layout';
import { AddItemsModal } from './components/add-items-modal';
import { setDataTransfer } from './utils/set-data-transfer';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  .list-container {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .groups-wrapper {
    flex: 1;
    padding: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;


    .group {
      flex: 1;
      min-width: 200px;
      margin: 8px;
      border: 1px solid #eee;
      box-shadow: 0px 0px 40px -15px rgba(0,0,0,0.3);
    }
  }

  .list-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 16px;
    overflow-y: auto;

    &:not(:first-child) {
      border-left: 1px solid #eee;
    }
  }

  .unsorted-items {
    background-color: #eee;
    max-width: 320px;
  }
`

interface State {
  groups: PurchaseGroup[]
  items: Purchase[]
  ungrouped: Purchase[]
  filtered: Purchase[]
  filter: string
}

const intialState: State = {
  groups: [
    new PurchaseGroup('asdf', 'asdfasdf'),
    new PurchaseGroup('asdf2', 'asdfasdf'),
    new PurchaseGroup('asdf3', 'asdfasdf'),
    new PurchaseGroup('asdf5', 'asdfasdf'),
    new PurchaseGroup('asdf6', 'asdfasdf'),
  ],
  items: [],
  filter: "",
  ungrouped: [],
  filtered: []
}

interface UpdateItems {
  type: 'UPDATEITEMS',
  payload: Purchase[]
}

interface AddItems {
  type: 'ADDITEMS',
  payload: Purchase[]
}

interface AddGroup {
  type: 'ADDGROUP',
  payload: PurchaseGroup
}

interface SetFilter {
  type: 'SETFILTER',
  payload: string
}

type ActionType = UpdateItems | AddGroup | SetFilter | AddItems


const itemsReducer = (state: State, action: ActionType): State => {
  let updateState: State
  switch (action.type) {
    case 'ADDGROUP':
      return {
        ...state,
        groups: [...state.groups, action.payload]
      }
    case 'ADDITEMS':
      updateState = {
        ...state,
        items: [...state.items, ...action.payload],
      }

      updateState.ungrouped = updateState.items.filter(i => i.group === null)
      updateState.filtered = updateState.ungrouped.filter(i => i.containsKeyword(updateState.filter))

      return updateState
    case 'SETFILTER':
      return {
        ...state,
        filter: action.payload,
        filtered: state.ungrouped.filter(i => i.containsKeyword(action.payload))
      }
    case 'UPDATEITEMS':
      updateState = {
        ...state,
      }
      updateState.items = state.items.map(i => {
        const u = action.payload.find(e => e.id === i.id)
        return u ? u : i
      })
      updateState.ungrouped = updateState.items.filter(i => i.group === null)
      updateState.filtered = updateState.ungrouped.filter(i => i.containsKeyword(updateState.filter))
      return updateState
    default:
      return state
  }
}


export const App = () => {
  const [state, dispatch] = React.useReducer(itemsReducer, intialState)
  const [addGroup, setAddGroup] = React.useState(false)
  const [addItems, setAddItems] = React.useState(false)

  const createGroup = () => setAddGroup(true)

  const handleGroupAdd = (g: PurchaseGroup) => {
    dispatch({
      type: 'ADDGROUP',
      payload: g
    })
    setAddGroup(false)
  }

  const handleGroupAddCancel = () => setAddGroup(false)

  const handleGroupChange = (p: Purchase[]) =>
    dispatch({
      type: 'UPDATEITEMS',
      payload: p
    })

  const setFilter = (value: string) => dispatch({
    type: 'SETFILTER',
    payload: value
  })

  const handleGroupDrag = (e: React.DragEvent<HTMLButtonElement>) =>
    setDataTransfer(e, state.filtered)

  const showAddItemsModal = () => setAddItems(true)
  const handleItemsModalClose = () => setAddItems(false)
  const handleItemsModalAdd = (items: Purchase[]) => dispatch({
    type: 'ADDITEMS',
    payload: items
  })

  return (
    <Wrapper>
      <Row>
        <Button onClick={createGroup}>kkkk</Button>
        <Button onClick={showAddItemsModal}>aaaa</Button>
      </Row>
      <div className="list-container">
        <div className="list-wrapper unsorted-items">
          <div>
            <Input value={state.filter} onChange={setFilter} />
            <Button draggable={true} onDragStart={handleGroupDrag}>>></Button>
            <PurhcaseList items={state.filtered} />
          </div>
        </div>

        <div className="groups-wrapper">
          {state.groups.map(g => (
            <PurchaseGroupEl
              key={g.id}
              group={g}
              items={state.items.filter(i => i.group === g.id)}
              onChange={handleGroupChange}
            />
          ))}
        </div>
      </div>
      {addGroup && (
        <AddGroup onAdd={handleGroupAdd} onCancel={handleGroupAddCancel} />
      )}
      {addItems && (
        <AddItemsModal onClose={handleItemsModalClose} onChange={handleItemsModalAdd} />
      )}
    </Wrapper>
  )
}

