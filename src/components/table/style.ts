import styled from "styled-components";

export const Container = styled.table`
  width: 100%;

  td {
    padding: 0.5em;

    &:first-child {
      padding-left: 32px;
    }
    &:last-child {
      padding-right: 32px;
    }
  }

  .value {
    text-align: right;
  }

  &.is-interactive {
    tr {
      td {
        transition-duration: 300ms;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(0,0,0, 0);
      }
    }

    tr:hover {
      cursor: pointer;
      td {
        border-bottom-color: rgba(0,0,0,0.3);
      }
    }
  }
`