import * as React from 'react'
import { Modal } from './modal';
import { Button } from './button';
import { TextArea } from './TextArea';
import { Column, Row, Flex } from './layout';
import { parse } from 'src/utils/parser';

interface Props {
  onClose: () => void
}

export const AddItemsModal = ({ onClose }: Props) => {
  const [text, setText] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleAdd = async () => {
    setLoading(true)
    const collection = parse(text)
    await Promise.all(collection.map(i => i.save()))
    setLoading(false)
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
        {loading ? <h2>loading</h2> : (
          <TextArea value={text} onChange={setText} />
          )
        }
      </Column>
    </Modal>
  )
}