import * as React from 'react'
import styled from 'styled-components';

export const ViewContainer = styled.div`
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
`

export const ViewBackground = styled.div`
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  opacity: 0.8;
`

interface Props {
  children: React.ReactNode
}

export const View = ({children }: Props) => (
  <ViewContainer>
    <ViewBackground />
    { children }
  </ViewContainer>
)