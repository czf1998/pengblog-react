import styled from 'styled-components'


export const FreshCommentsWrapper = styled.div`
        padding-left: 2rem;
        padding-right: 1rem;
        flex-grow: 1;
        overflow-Y: scroll;
        margin-right: 2rem;
       ${props => props.browser !== 'Safari' ? `
        &::-webkit-scrollbar{
            width:2px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
        
        }` 
        : ''}
    `

export const Title = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        padding-bottom: 0.8rem;
        margin-bottom: 1rem;
        border-bottom: solid 1px #f0f0f0;
    `
