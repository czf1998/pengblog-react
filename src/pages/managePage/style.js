import styled from 'styled-components'

const headerHeight = 70
const milePostWidth = 1000

export const CentralController = styled.div`
        position: fixed;
        top: ${headerHeight}px;
        bottom: 0;
        left: 0;
        width: 320px;
        padding-top: 2rem;
        border-right: solid 1px #EEEEEE;
        
        @media(max-width:${milePostWidth}px){
            width: 300px;
        }
    `

export const ArticleListWrapper = styled.div`
        margin-left: 400px;
        width: calc(100% - 400px);
        display: flex;
        padding-left: 1rem;
        
        @media(max-width:${milePostWidth}px){
            margin-left: 300px;
            width: calc(100% - 300px);
        }
    `

export const ArticleListFixer = styled.div`
        width: 700px;
        
         @media(max-width:${milePostWidth}px){
            width: 100%;
        }
    `

export const Title = styled.div`
        padding: 1rem 2rem;
        padding-left: 0;
        font-size: 2rem;
        font-weight: 100;
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `

export const Header = styled.div`
        width: 100%;
        display: flex;
        padding-bottom: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-bottom: solid 1px #EEEEEE;
        color: grey;
    `

export const ArticleTitle = styled.div`
        width: 50%;
        display: flex;
        justify-content: center;
    `

export const ArticleAuthor = styled(ArticleTitle)`
        width: 15%;
    `

export const ArticleLabel = styled(ArticleTitle)`
        width: 10%;
    `

export const ArticleReleaseTime = styled(ArticleTitle)`
        width: 25%;
    `

