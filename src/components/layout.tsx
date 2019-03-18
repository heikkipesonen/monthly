import styled from "styled-components";

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

interface FlexProps {
  flex?: number
}
export const Flex = styled.div`
  position: relative;
  flex: ${(props: FlexProps) => props.flex ? props.flex : '1'}
`