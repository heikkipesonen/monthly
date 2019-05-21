import * as React from 'react'
import styled from "styled-components"

interface Props {
  onChange: (value: string) => void
  value: string
  label?: string
  type?: 'text' | 'email' | 'password'
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
  placeholder,
  label
}: Props) => (
    <div className={className}>
      <label>
        {label && <span className={'label'}>{label}</span>}
        <textarea
          placeholder={placeholder}
          onChange={onChangeListener(onChange)}
          value={value}
        />
      </label>
    </div>
  )

export const TextArea = styled(InputElement)`
  width: 100%;

  label {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  .label {
    font-weight: bold;
    margin-bottom: 8px;
  }

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