import * as React from 'react'
import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large'
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .modal {
    position: relative;
    width: ${(props: ContainerProps) => props.size === "large" ? '80vh' : '500px'};;
    height: ${(props: ContainerProps) => props.size === "large" ? '80vh' : '600px'};
    max-height: 90vh;
    max-width: 90vw;

    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 120px -30px rgba(0, 0, 0, 0.8);

    display: flex;
    flex-direction: column;

    &-header {
      padding: 16px;
    }

    &-footer {
      padding: 16px;
    }

    &-content {
      position: relative;
      flex: 1;

      &-inner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        padding: 16px;
      }
    }
  }
`

interface Props extends ContainerProps {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  onClose: () => void
}

export const Modal = ({ children, header, footer, size, onClose }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onClose()
  }

  return (
  <Container size={size}>
    <div className="backdrop" onClick={handleClose}/>
    <div className="modal" onClick={handleClick}>
      <div className="modal-header">
        { header }
      </div>

      <div className="modal-content">
        <div className="modal-content-inner">
          {children}
        </div>
      </div>

      <div className="modal-footer">
        { footer }
      </div>
    </div>
  </Container>
)
}