import *  as React from 'react'
import { Modal } from './modal';
import { startOfMonth, format } from 'date-fns';
import { Input } from './input';
import styled from 'styled-components';


const MonthsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 256px;
`

const MonthWrapper = styled.div`
  display: flex;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`

type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
interface Props {
  onChange: (d: Value) => void
  onClose: () => void
}

const months: Value[] = Array(12).fill(false).map((_, i) => i as Value)

export const Monthpicker = ({ onChange, onClose }: Props) => {
  const handleSubmit = (v: Value) => () => onChange(v)

  return (
    <Modal
      header={'kikke'}
      onClose={onClose}>

      <MonthsWrapper>
        {months.map(m => (
          <MonthWrapper key={m} onClick={handleSubmit(m)}>
            {m + 1}
          </MonthWrapper>
        ))}
      </MonthsWrapper>
    </Modal>
  )
}

interface FieldProps {
  value: Date
  onChange: (d: Date) => void
}
export const MonthpickerField = ({ value, onChange }: FieldProps) => {
  const [focused, setFocused] = React.useState<boolean>(false)
  const handleFocusChange = (v: boolean) => () => setFocused(v)
  const handleChange = (v: Value) => {
    const d = new Date(value.valueOf())
    d.setMonth(v)
    onChange(startOfMonth(d))
  }

  return (
    <>
      <Input
        onFocus={handleFocusChange(true)}
        onChange={handleFocusChange(false)}
        value={format(value, 'MM.YYYY')}
        />
      {focused ? (
        <Monthpicker onChange={handleChange} onClose={handleFocusChange(false)} />
      ) : null}
    </>
  )
}