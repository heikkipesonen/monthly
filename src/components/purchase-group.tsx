import * as React from 'react'
import styled from 'styled-components';

import { Purchase } from 'src/types/purchase';
import { PurchaseGroup } from 'src/types/purchase-group';
import { Money } from 'src/utils/money';
import { GroupContentsModal } from './group-contents-modal';
import { Row, Flex } from './layout';
import { getDataTransfer } from 'src/utils/set-data-transfer';

const Container = styled.div`
  background-color: #fefefe;
  padding: 16px;
  cursor: pointer;
`

interface Props {
  group: PurchaseGroup
  items: Purchase[]
  onChange: (p: Purchase[]) => void
}

const totalValue = (items: Purchase[]) =>
  items.reduce((r: Money, i) => r.add(i.value), new Money(0)).displayValue()

export const PurchaseGroupEl = ({ group, items, onChange }: Props) => {
  const [modal, setModal] = React.useState(false)

  const handleModalOpen = () => setModal(true)
  const handleModalClose = () => {
    setModal(false)
  }
  const handleModalChange = () => {}

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const payload = getDataTransfer(e)
    onChange(
      payload.map(i => i.setGroup(group.id))
    )
  }

  return (
    <Container className={'group'} onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleModalOpen}>
      <h2>{group.name}</h2>
      <Row>
        {items.length}
        <Flex />
        { totalValue(items) }
      </Row>
      {modal && <GroupContentsModal
        group={group}
        items={items}
        onChange={handleModalChange}
        onClose={handleModalClose}
      />}
    </Container>
  )}