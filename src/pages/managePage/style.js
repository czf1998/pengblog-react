import styled from 'styled-components'

const headerHeight = 70

const milePostWidth2 = 800

const milePostWidth = 1440

export const CentralController = styled.div`
        position: fixed;
        top: ${headerHeight}px;
        bottom: 0;
        left: 0;
        width: 300px;
        padding-top: 2rem;
        border-right: solid 1px #EEEEEE;
        
        @media(max-width:${milePostWidth2}px){
            display:none
        }
    `

export const ArticleListWrapper = styled.div`
        display: flex;
        justify-content: center;
        padding-left: 1rem;
        padding-right: 1rem;
        
        margin-left: 300px;
        width: calc(100% - 300px);
        
        @media(max-width:${milePostWidth2}px){
            padding: 0;
            margin-left: 0;
            width: 100%;
        }
    `

export const ArticleListFixer = styled.div`
        position: relative;
        min-height: ${props => props.heightOfBrowser - 70}px;
        width: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
         @media(max-width:${milePostWidth}px){
            width: 800px;
        }
    `

export const ArticleList = styled.div`
    `

export const Title = styled.div`
        padding: 1rem 2rem;
        font-size: 2rem;
        font-weight: 100;
        @media(max-width:${milePostWidth2}px){
            padding: 1rem;
            padding-bottom: 0;
            
        }
    `


export const Header = styled.div`
        position: relative;
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
    `

export const ArticleAuthor = styled.div`
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 1rem;
        line-height: 1.4;
    `


export const MultipleSelectTitle = styled.div`
        position:absolute;
        width: 5%;
        top: 0;
        bottom: 0;
        left: 1rem;
        cursor: pointer;
        color:#175199;
        &:hover{
            color: black;
        }
    `

export const ShutDownMultipleSelect = styled(MultipleSelectTitle)`
        left: calc(5% + 2rem);
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

export const SearchBarMobile = styled.div`
        width: 100%;
        display: none;
        border-bottom: solid 1px #f0f0f0; 
        @media(max-width:${milePostWidth2}px){
           display: block;
        }
    `