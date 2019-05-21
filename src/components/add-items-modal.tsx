import * as React from 'react'
import { TextArea } from './TextArea';
import { Column, Row, Flex } from './layout';
import { parse } from 'src/utils/parser';
import { Button } from './button';
import { DraftPurchase } from 'src/api/dto/purchase-entry';
import { View } from './view';

interface Props {
  onSubmit: (list: DraftPurchase[]) => void
  onCancel: () => void
}

export const AddItemsModal = ({ onSubmit, onCancel }: Props) => {
  const [text, setText] = React.useState<string>('')
  const handleSubmit = () => onSubmit(parse(text))


  return (
    <View>
        <Row>
          <Button onClick={onCancel}>
            cancel
          </Button>
          <Flex />
          <Button onClick={handleSubmit}>
            add
          </Button>
        </Row>
      <Column>
        <TextArea label={'text'} onChange={setText} value={text} />
      </Column>
    </View>
)}