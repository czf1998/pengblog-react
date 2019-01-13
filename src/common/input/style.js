import styled from 'styled-components'

export const InputWrapper = styled.div`
        position: relative;
    `

export const Inputer = styled.input`
        position: relative;
        background: #f7f7f7;
        font-size: 1rem;
        outline: none;
        padding: 0.5em;
        padding-left: 2rem;
        border: solid 1px #f7f7f7;
        border-radius: 3px;
        transition: all 0.2s ease;
        &:focus{
        box-shadow 1px 1px 2px #999999 inset;
        border: solid 1px #E6E6E6;
        }
`

export const InputIcon = styled.div`
        position:absolute;
        top: 0.6rem;
        left: 0.6rem;
    `