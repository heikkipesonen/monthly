import * as React from 'react'
import { Modal } from './modal';
import { Column, Row, Flex } from './layout';
import { Button } from './button';
import { Purchase } from 'src/api/dto/purchase-entry';
import { PurchaseList } from './purhcase-list';
import { PurchaseGroup } from 'src/api/dto/purchase-group';

interface Props {
  group: PurchaseGroup
  items: Purchase[]
  onCancel: () => void
}

export const GroupItemsModal = ({ group, items, onCancel }: Props) => {

  return (
    <Modal
      size={'medium'}
      header={group.name}
      onClose={onCancel}
      footer={
        <Row>
          <Button onClick={onCancel}>
            cancel
          </Button>
          <Flex />
        </Row>
      }>
      <Column>
        <PurchaseList
          items={items}
        />
      </Column>
    </Modal>
  )
}