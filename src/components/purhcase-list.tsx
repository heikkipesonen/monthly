import * as React from 'react'
import styled from 'styled-components';
import { toDateString } from 'src/utils/parser';
import { PurchaseItem } from 'src/api/dto/purchase-entry';

const Container = styled.table`
  width: 100%;

  td {
    padding: 8px;
    border-bottom: 1px solid #eee;

    &:first-child {
      padding-left: 32px;
    }
    &:last-child {
      padding-right: 32px;
    }
  }

  .value {
    text-align: right;
  }
`


interface Props {
  items: PurchaseItem[]
}

export const PurchaseList = React.memo(({ items }: Props) => (
  <Container>
    <tbody>
      {items.map((i, index )=> (
        <PurchaseListItem item={i} key={index} />
      ))}
    </tbody>
  </Container>
))

interface ItemProps {
  item: PurchaseItem
}

const PurchaseListItem = React.memo(({ item }: ItemProps) => (
  <tr className="list-item">
    <td className="date">
      {toDateString(item.date)}
    </td>
    <td className="title">
      <strong>{item.desc}</strong>
    </td>
    <td className="value">
      {item.value.displayValue()}
    </td>
  </tr>
))


