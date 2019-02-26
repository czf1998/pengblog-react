import styled from 'styled-components'


export const ArticleTitle = styled.div`
        width: 55%;
        display: flex;
        align-items: center;
        padding: 1rem;
        padding-left: 2rem;
        padding-right:3rem;
        line-height: 1.4;
        position: relative;
        justify-content: flex-start;
        color: black;
        cursor: pointer;
    `

export const ArticleTitleInner = styled.span`
        &:hover{
            color: #3367d6;
        }
    `

export const DeleteButton = styled.div`
        position: absolute;
        height: 100%;
        top: 0;
        right: 1rem;
        display: flex;
        padding: 0.5rem;
        align-items: center;
        color: black;  
        &:hover{
            color: #3367d6;
        }     
    `


export const ArticleAuthor = styled.div`
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        padding-left: 0;
        line-height: 1.4;
    `

export const ArticleLabel = styled(ArticleAuthor)`
        width: 10%;
        
    `

export const ArticleReleaseTime = styled(ArticleAuthor)`
        width: 20%;
    `


export const ArticleItemWrapper = styled.div`
        width: 100%;
        display: flex;
        margin-top: 1rem;
        color: grey;
        margin-top: 0;
        margin-bottom: 0;
        background: white;
        border-bottom: solid 1px #EEEEEE;
        ${props => props.browser === 'Safari' ? '' : `
            &:hover{
                background:linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,0.05), rgba(255,255,255,1));
            }
        `}
    `


