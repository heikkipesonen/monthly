import * as React from 'react'
import styled from 'styled-components';
import classNames from 'classnames'

import { Purchase } from 'src/types/purchase';
import { PurchaseGroup } from 'src/types/purchase-group';
import { Money } from 'src/utils/money';
import { GroupContentsModal } from './group-contents-modal';
import { Flex, Row } from './layout';
import { getDataTransfer } from 'src/utils/set-data-transfer';

const Container = styled.div`
  &.onHover {
    background-color: #d00;
  }
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
  const [onHover, setHover] = React.useState(false)

  const handleModalOpen = () => setModal(true)
  const handleModalClose = () => {
    setModal(false)
  }
  const handleModalChange = () => {}

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setHover(true)
  }
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    setHover(false)

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const payload = getDataTransfer(e)
    await Promise.all(payload.map(i => i.update({ group: group.id })))
    setHover(false)
  }

  return (
    <Container
      className={classNames("group", { onHover })}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleModalOpen}
    >
      <Row>
        <Flex>
          {group.name}
        </Flex>
        <strong>
          {totalValue(items)}
        </strong>
      </Row>
      {modal && (
        <GroupContentsModal
          group={group}
          items={items}
          onChange={handleModalChange}
          onClose={handleModalClose}
        />
      )}
    </Container>
  )}