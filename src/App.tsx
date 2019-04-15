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
import { onEntriesUpdate, onGroupsUpdate } from './domain/db';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;

  .toolbar {
    display: flex;
    flex-direction: column;
    background-color: #444;
    width: 64px;

    button {
      border: none;
      color: white;
      width: 64px;
      height: 64px;
    }
  }

  .list-container {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .groups-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 30px;
    box-shadow: 0px 0px 80px -15px rgba(0,0,0,0.5);
    margin-left: auto;
    margin-right: auto;

    .group {
      padding: 16px;
      &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
      }

      &:hover {
        cursor: pointer;
        background-color: #eee;
      }
    }
  }

  .list-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;

    &:not(:first-child) {
      border-left: 1px solid #eee;
    }
  }

  .unsorted-items {
    max-width: 320px;

    .input-container {
      flex: 1;
    }
  }
`

interface State {
  groups: PurchaseGroup[]
  items: Purchase[]
}

const intialState: State = {
  groups: [],
  items: []
}

interface UpdateItems {
  type: 'UPDATEITEMS',
  payload: Purchase[]
}

interface SetGroups {
  type: 'SETGROUPS',
  payload: PurchaseGroup[]
}

interface SetItems {
  type: 'SETITEMS',
  payload: Purchase[]
}

type ActionType = SetItems | UpdateItems | SetGroups

type GroupedItems = Record<string | 'ungrouped', Purchase[]>
const groupItems = (items: Purchase[]) =>
  items.reduce((groups: GroupedItems, i) => {
    const key = i.group || 'ungrouped'
    groups[key] = [
      ...(groups[key] || []),
      i
    ]
    return groups
  }, { ungrouped: [] })

const itemsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SETGROUPS":
    return {
      ...state,
      groups: [...action.payload]
    }
    case "SETITEMS":
      return {
        ...state,
        items: [...action.payload]
      }
    case "UPDATEITEMS":
      return {
        ...state,
        items: state.items.map(i => {
          const u = action.payload.find(e => e.id === i.id)
          return u ? u : i
        })
      }
    default:
      return state
  }
}

const initialGrouped: GroupedItems = {
  ungrouped: []
}

const initialFiltered: Purchase[] = []

export const App = () => {
  const [state, dispatch] = React.useReducer(itemsReducer, intialState)
  const [addGroup, setAddGroup] = React.useState(false)
  const [addItems, setAddItems] = React.useState(false)

  const [grouped, setGrouped] = React.useState(initialGrouped)
  const [filtered, setFiltered] = React.useState(initialFiltered)
  const [filter, setFilter] = React.useState('')

  React.useEffect(() => {
    onEntriesUpdate(payload =>
      dispatch({
        type: "SETITEMS",
        payload
      })
    )

    onGroupsUpdate(payload => {
      dispatch({
        type: 'SETGROUPS',
        payload
      })
    })
  }, [])

  React.useEffect(() => {
    setGrouped(groupItems(state.items))
  }, [state.items, state.groups])

  React.useEffect(() => {
    setFiltered(grouped.ungrouped.filter(i => i.containsKeyword(filter)))
  }, [grouped, filter])

  const createGroup = () => setAddGroup(true)
  const handleGroupAddCancel = () => setAddGroup(false)
  const handleGroupChange = (p: Purchase[]) =>
    dispatch({
      type: 'UPDATEITEMS',
      payload: p
    })
  const handleGroupDrag = (e: React.DragEvent<HTMLButtonElement>) =>
    setDataTransfer(e, filtered)

  const showAddItemsModal = () => setAddItems(true)
  const handleItemsModalClose = () => setAddItems(false)

  return (
    <Wrapper>
      <div className="toolbar">
        <Button onClick={createGroup}>kkkk</Button>
        <Button onClick={showAddItemsModal}>aaaa</Button>
      </div>
      <div className="list-container">
        <div className="list-wrapper unsorted-items">
          <Row>
            <Input className={'input-container'} value={filter} onChange={setFilter} />
            <Button
              draggable={filtered.length > 0}
              onDragStart={handleGroupDrag}
            >
              >>
            </Button>
          </Row>
          <PurhcaseList items={filtered} />
        </div>

        <div className="groups-wrapper">
          {state.groups.map(g => (
            <PurchaseGroupEl
              key={g.id}
              group={g}
              items={grouped[g.id] || []}
              onChange={handleGroupChange}
            />
          ))}
        </div>
      </div>
      {addGroup && <AddGroup onCancel={handleGroupAddCancel} />}
      {addItems && (
        <AddItemsModal
          onClose={handleItemsModalClose}
        />
      )}
    </Wrapper>
  )
}

