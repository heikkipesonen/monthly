import * as React from 'react'
import styled from 'styled-components';
import { startOfMonth, addDays } from 'date-fns'

const weekDays = [1, 2, 3, 4, 5, 6, 0]
const dayOfWeek = (d: Date) => weekDays.indexOf(d.getDay())

type DateCell = Date | false
type Calendar = Array<DateCell[]>

const getWeek = (): DateCell[] => Array(7).fill(false)

const getMonth = (d: Date): Calendar => {
  let m = startOfMonth(d)
  const model: Calendar = [
    getWeek()
  ]

  while (m.getMonth() === d.getMonth()) {
    const i = model.length - 1
    const wd = dayOfWeek(m)

    model[i][wd] = new Date(m.valueOf())

    if (wd === 6) {
      model.push(getWeek())
    }

    m = addDays(m, 1)
  }

  return model
}


const Container = styled.div`
  padding: 16px;
  background-color: white;
  table {
    border-spacing: 0;
    width: 100%;
  }

  td {
    text-align: center;
    padding: 8px;
    width: 42px;
    height: 42px;
  }
`

interface MonthProps {
  value: number
}
const Month = ({ value }: MonthProps) => {
  const d = new Date()
  d.setMonth(value)

  const calendar = getMonth(d)
  return (
  <tbody>
    {calendar.map((w, i) => (
      <tr key={i}>
        {w.map((d, id) => (
          <td key={id}>
            {d && d.getDate()}
          </td>
        ))}
      </tr>
    ))}
  </tbody>

)
}

interface Props {
  value: Date
  onChange: (d: DateCell) => void
}
export const DatePicker = ({ value }: Props) => {
  return (
    <Container className="date-picker">
      <table>
        <Month value={value.getMonth()} />
      </table>
    </Container>
  )
}

