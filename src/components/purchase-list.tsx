import * as React from 'react'
import { Purchase } from 'src/types/purchase';
import { PurchaseRow } from './purchase-row';
import styled from 'styled-components';
import { sortByDate } from 'src/utils/stort';
import { setDataTransfer } from 'src/utils/set-data-transfer';

interface Props {
  items: Purchase[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const handleDragStart = (item: Purchase) => (e: React.DragEvent<HTMLDivElement>) =>
  setDataTransfer(e, [item])

export const PurhcaseList = ({ items }: Props) => {
  const list = sortByDate(items)
  return (
    <Container className="list">
      {list.map(item => (
        <div
          draggable={true}
          onDragStart={handleDragStart(item)}
          key={item.id}
        >
          <PurchaseRow item={item} />
        </div>
      ))}
    </Container>
  )}