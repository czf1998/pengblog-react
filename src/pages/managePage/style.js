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
        padding-right: 2rem;
        
        @media(max-width:${milePostWidth}px){
            margin-left: 300px;
            width: calc(100% - 300px);
        }
    `

export const ArticleListFixer = styled.div`
        position: relative;
        min-height: ${props => props.heightOfBrowser - 70}px;
        width: 700px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
         @media(max-width:${milePostWidth}px){
            width: 100%;
        }
    `

export const ArticleList = styled.div`
    `

export const Title = styled.div`
        padding: 1rem 2rem;
        padding-left: 0;
        font-size: 2rem;
        font-weight: 100;
    `


export const Header = styled.div`
        width: 100%;
        display: flex;
        padding-bottom: 1rem;
        margin-top: 1rem;
        border-bottom: solid 2px #EEEEEE;
        color: grey;
    `

export const HeaderArticleTitle = styled.div`
        width: 55%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 2rem;
        padding-right: 1rem;
        line-height: 1.4;
    `

export const ArticleAuthor = styled.div`
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 1rem;
        line-height: 1.4;
    `

export const ArticleLabel = styled(ArticleAuthor)`
        width: 10%;
    `

export const ArticleReleaseTime = styled(ArticleAuthor)`
        width: 20%;
    `

export const PaginationFixer = styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
    `

export const LoadingWrapper = styled.div`
        z-index: -1;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    `

export const ArticleDetail = styled.div`
        z-index: 2;
        position: fixed;
        right: ${props => props.showArticleDetail ? '0' : '-700px'};
        width: 700px;
        top: 0;
        height: 100%;
        background: gray;
        overflow-y:scroll;
        transition: all 0.4s ease; 
    `