import styled from 'styled-components'

export const Input = styled.input`
      outline: none;
      padding: 0.5em;
      background: #f7f7f7;
      border: solid 1px #f7f7f7;
      border-radius: 3px;
      transition: all 0.2s ease;
      &:focus{
        box-shadow: 0 0 8px #999999;
        border: solid 1px #E6E6E6;
      }
`