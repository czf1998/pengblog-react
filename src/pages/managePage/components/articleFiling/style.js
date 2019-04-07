import styled from 'styled-components'

//const widthOfMainArea = 750
const maxMobileWidth = 750
const milePostWidth = 800

//const backgroundColor = '#F7F7F7'

export const ArticleFilingWrapper = styled.div`
        padding: 1rem 2rem;
        width: 100%;
        @media(max-width:${milePostWidth}px){
        }
        @media(max-width:${maxMobileWidth}px){
            padding: 1rem;
        }
    `

export const ArticleFilingTitle = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        padding-bottom: 0.8rem;
        margin-bottom: 1rem;
        border-bottom: solid 1px #f0f0f0;
    `

export const ArticleFilinger = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
    `

export const DateSelector = styled.div`
        display: flex;
        align-items: center;
    `


export const SubmitButton = styled.button`
        -webkit-appearance:none;
        padding: 0 0.6rem;
        outline: none;
        cursor: ${props => props.year ? 'pointer' : 'default'};
        color: white;
        background: gray;
        border: solid 1px gray;
        border-radius: 0.4rem;
        transition: all 0.4s ease;
        ${props => props.year ? ` 
        &:hover{
            background: hsl(209, 100%, 45%);
            border: 1px solid #0084FF;
        }` : ''};
        @media(max-width:${maxMobileWidth}px){
            font-size: 1rem;
            padding: 0 1rem;
        }
    `

export const Option = styled.option`
        color: blue;
          outline: none;
    
    `