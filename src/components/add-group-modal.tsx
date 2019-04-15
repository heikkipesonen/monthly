import * as React from 'react'
import { Modal } from './modal';
import { Input } from './input'
import { PurchaseGroup } from 'src/types/purchase-group';
import { Button } from './button';
import { Row, Flex } from './layout';

interface Props {
  onCancel: () => void
}

export const AddGroup = ({ onCancel }: Props) => {
  const [name, setName] = React.useState('')
  const handleOk = async () => {
    await PurchaseGroup.create(name)
    setName('')
    onCancel()
  }

  return (
    <Modal
      onClose={onCancel}
      header="add group"
      footer={(
      <Row>
        <Button onClick={onCancel}>cancel</Button>
        <Flex />
        <Button onClick={handleOk}>add</Button>
      </Row>
    )}>
      <Input value={name} onChange={setName} />
    </Modal>
  )
}