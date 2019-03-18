import * as React from 'react'
import { Modal } from './modal';
import { PurchaseGroup } from 'src/types/purchase-group';
import { PurhcaseList } from './purchase-list';
import { Purchase } from 'src/types/purchase';
import { Button } from './button';

interface Props {
  group: PurchaseGroup
  items: Purchase[]
  onClose: () => void
  onChange: (p: PurchaseGroup) => void
}

export const GroupContentsModal = ({ group, items, onClose }: Props) => (
  <Modal
    onClose={onClose}
    header={group.name}
    footer={<Button onClick={onClose}>cancel</Button>}
  >
    <PurhcaseList items={items} />
  </Modal>
)