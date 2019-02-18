import styled from 'styled-components'

const headerHeight = 70

const milePostWidth = 1000

export const CentralController = styled.div`
        position: fixed;
        top: ${headerHeight}px;
        bottom: 0;
        left: 0;
        width: 400px;
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

export const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `

