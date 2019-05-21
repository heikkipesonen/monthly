import * as React from 'react'
import styled from "styled-components"

interface Props {
  onChange: (value: string) => void,
  value: string,
  type?: 'text' | 'email' | 'password',
  className?: string
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
}

const onChangeListener = (cb: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value)

const InputElement = ({
  onChange,
  value,
  type = "text",
  className,
  onFocus,
  onBlur,
  placeholder
}: Props) => (
  <div className={className}>
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      onChange={onChangeListener(onChange)}
      value={value}
    />
  </div>
)

export const Input = styled(InputElement)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  text-align: inherit;

  input {
    outline: none;
    border: none;
    border-radius: 0;
    background-color: transparent;
    width: auto;
    border-bottom: 2px solid #000;
    font-size: 1.5rem;
    font-weight: 200;
    text-align: inherit;

    ::-webkit-input-placeholder {
      color: #777;
    }
  }

`