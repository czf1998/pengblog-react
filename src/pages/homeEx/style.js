import styled from 'styled-components'

const headerHeight = 70

const milePostWidth = 1000

export const ArticleListWrapper = styled.div`
        position: fixed;
        top: ${headerHeight}px;
        bottom: 0;
        left: 0;
        width: 400px;
        background: green;
        overflow-y:scroll;
        ${props => props.browser !== 'Safari' ? `&::-webkit-scrollbar{
            width:10px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
            background: white;
        }` : ''}
        @media(max-width:${milePostWidth}px){
            width: 300px;
        }
    `


export const ArticleDetailWrapper = styled.div`
        margin-left: 400px;
        width: calc(100% - 400px);
        display: flex;
        padding-left: 1rem;
        @media(max-width:${milePostWidth}px){
            margin-left: 300px;
            width: calc(100% - 300px);
        }
    `

export const ArticleDetailFixer = styled.div`
        width: 700px;
         @media(max-width:${milePostWidth}px){
            width: 100%;
        }
    `

