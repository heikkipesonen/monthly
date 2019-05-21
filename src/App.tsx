import * as React from 'react';
import './index.css'

import styled from 'styled-components'
import { Button } from './components/button';
import { MonthpickerField } from './components/date-picker';
import { Textalign } from './components/layout';
import { AddItemsModal } from './components/add-items-modal';
import { DraftPurchase } from './api/dto/purchase-entry';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`

const AppMenu = styled.div`
  position: absolute;
  bottom: 0; right: 0;
  padding: 16px;
  background-color: #000;
  color: white;
`

const v = new Date()
export const App = () => {
  const [showAddItems, setShowAddItems] = React.useState<boolean>(false)

  const setAddItems = (v: boolean) => () => setShowAddItems(v)
  const handleItemsSubmit = (v: DraftPurchase[]) => {
    console.log(v)
  }

  return (
    <Wrapper>
      <Textalign align="center">
        <MonthpickerField value={v} onChange={console.log} />
      </Textalign>
      <AppMenu>
        <Button onClick={setAddItems(true)}>
          add items
        </Button>
        <Button>
          add groups
        </Button>
      </AppMenu>

      {showAddItems && <AddItemsModal onSubmit={handleItemsSubmit} onCancel={setAddItems(false)} />}
    </Wrapper>
  )
}

