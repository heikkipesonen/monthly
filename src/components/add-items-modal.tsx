import * as React from 'react'
import { Modal } from './modal';
import { Button } from './button';
import { TextArea } from './TextArea';
import { Column, Row, Flex } from './layout';
import { Purchase } from 'src/types/purchase';
import { parse } from 'src/utils/parser';


interface Props {
  onClose: () => void
  onChange: (items: Purchase[]) => void
}

export const AddItemsModal = ({ onChange, onClose }: Props) => {
  const [text, setText] = React.useState('')

  const handleAdd = () => {
    onChange(parse(text))
    setText('')
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      header="add items"
      footer={
        <Row>
          <Button onClick={onClose}>kikkeli</Button>
          <Flex />
          <Button onClick={handleAdd}>kikkeli</Button>
        </Row>
      }
    >
      <Column>
        <TextArea value={text} onChange={setText} />
      </Column>
    </Modal>
  )
}