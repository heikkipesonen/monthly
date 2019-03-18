import * as React from 'react'
import styled from 'styled-components'

import { Purchase } from '../types/purchase'
import { toDateString } from 'src/utils/parser';

interface Props {
  item: Purchase
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  border-bottom: 1px solid #ddd;

  .row-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .value {
    font-weight: bold;
  }

  .descrption span {
    padding: 4xp 0;
    font-weight: 400;
    &:hover {
      background-color: #eee;
    }
  }
`

export const PurchaseRow = ({
  item,
}: Props) => (
  <Container>
    <div className="row-content">
      <div className="date">{toDateString(item.date)}</div>
      <div className="descrption">
        {item.desc}
      </div>
    </div>
    <div className="value">{item.value.displayValue()}</div>
  </Container>
)