import styled from 'styled-components'

export const SelectWrapper = styled.div`
       position: relative;
      
    `

export const SelectHead = styled.div`
        display: flex;
        
         position: relative;
    `

export const SelectContent = styled.div`
        -webkit-appearance:none;
        outline: none;
        font-size: 1rem;
        width: ${props => props.width ? props.width : '8rem'};
        height: 34px;
        border: solid 1px gray;
        border-radius: 0.4rem;
        padding: 0.5rem;
        &:disabled{
            background: white;
        }
    `

export const SelectButtonFixer = styled.div`
        color: gray;
        cursor: pointer;
        &:hover{
            color: black;
        }
    `

export const SelectButton = styled.div`
        position: absolute;
        height: 100%;
        right: 0.5rem;
        display: flex;
        align-items: center;
    `

export const Options = styled.div`
        z-index: 999;
        background: white;
        position: absolute;
        width: 100%;
        top: calc(100% + 0.2rem);
        height: ${props => props.show ? props.length * 2 + 'rem' : '0'};
        border: solid 1px gray;
        border-top: ${props => props.show ? 'solid 1px gray' : 'solid 0 gray'};
        border-bottom: ${props => props.show ? 'solid 1px gray' : 'solid 0 gray'};
        border-radius: 0.4rem;
        overflow: hidden;
        transition: all 0.1s ease;
    `

export const OptionItem = styled.div`
        font-size: 1rem;
        height: 2rem;
        line-height: 2rem;
        padding-left: 0.5rem;
        border-bottom: solid 1px grey;
        cursor: pointer;
        color: gray;
         &:hover{
            color: black;
            background: #F7F7F7;
        }
    `

export const ShadowInput = styled.input`
        -webkit-appearance:none;
        outline: none;
        z-index: -1;
        border: none;
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events:none;
    `
