import * as React from 'react'
import { Money } from 'src/utils/money';
import { Container } from './table/style';
import { PurchaseItem } from 'src/api/dto/purchase-entry';
import { PurchaseGroup } from 'src/api/dto/purchase-group';

interface Props {
  groups: PurchaseGroup[]
  items: PurchaseItem[]
  onClick?: (x: PurchaseGroup) => void
}

const getGroupItems = (g: PurchaseGroup, items: PurchaseItem[]) =>
  items.filter(i => i.type === 'PURCHASE' && i.group === g.id)

export const GroupList = React.memo(({ groups, items, onClick }: Props) => (
  <Container className={onClick ? 'is-interactive' : undefined}>
    <tbody>
      {groups.map(g => (
        <GroupListItem
          items={getGroupItems(g, items)}
          group={g}
          key={g.id}
          onClick={onClick}
        />
      ))}
    </tbody>
  </Container>
))

interface ItemProps {
  group: PurchaseGroup
  items: PurchaseItem[]
  onClick?: (x: PurchaseGroup) => void
}

const groupValue = (items: PurchaseItem[]): Money =>
  items.reduce((v, i) => v.add(i.value), new Money(0))

const handleClick = (cb: ItemProps['onClick'], x: PurchaseGroup) => () => cb ? cb(x) : null

const GroupListItem = React.memo(({ items, group, onClick }: ItemProps) => (
  <tr className="list-item" onClick={handleClick(onClick, group)}>
    <td className="title">
      {group.name}
    </td>
    <td className="value">
      {groupValue(items).displayValue()}
    </td>
  </tr>
))


