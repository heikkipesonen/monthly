import styled from "styled-components";

interface FlexProps {
  flex?: number
  justifyContent?: 'center' | 'start' | 'end'
  alignItems?: 'center' | 'start' | 'end'
}

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex: ${(props: FlexProps) => props.flex};
  justify-content: ${(props: FlexProps) => props.justifyContent || 'flex-start'};
  align-items: ${(props: FlexProps) => props.alignItems || 'flex-start'};
`

export const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: ${(props: FlexProps) => props.flex};
  justify-content: ${(props: FlexProps) => props.justifyContent || 'flex-start'};
  align-items: ${(props: FlexProps) => props.alignItems || 'flex-start'};
`

export const Flex = styled.div`
  position: relative;
  flex: ${(props: FlexProps) => props.flex ? props.flex : '1'};
`

type Align = 'left' | 'center' | 'right'
interface TextalignProps {
  align: Align
}

export const Textalign = styled.div`
  text-align: ${(props: TextalignProps) => props.align}
`