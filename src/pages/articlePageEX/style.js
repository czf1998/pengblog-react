import styled from 'styled-components'


const maxMobileWidth = 750



export const ArticleDetailWrapper = styled.div`
        width: 100%;
        display: flex;
       justify-content: center;
         @media(max-width:${maxMobileWidth}px){
            display: none;
        }
    `

export const ArticleDetailFixer = styled.div`
        width: 700px;
        @media(min-width:1600px){
            width: 900px;
        }
    `


export const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `

