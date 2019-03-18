import * as React from 'react'
import styled from "styled-components"

interface Props {
  onChange: (value: string) => void,
  value: string,
  type?: 'text' | 'email' | 'password',
  className?: string

  placeholder?: string
}

const onChangeListener = (cb: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    cb(e.target.value)

const InputElement = ({
  onChange,
  value,
  className,
  placeholder
}: Props) => (
    <div className={className}>
      <textarea
        placeholder={placeholder}
        onChange={onChangeListener(onChange)}
        value={value}
      />
    </div>
  )

export const TextArea = styled(InputElement)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  textarea {
    height: 220px;
    outline: none;
    border: 1px solid #eee;
    border-radius: 0;
    background-color: transparent;
    width: auto;
    font-size: 1rem;
    font-weight: 200;
    resize: none;

    ::-webkit-input-placeholder {
      color: #777;
    }
  }

`