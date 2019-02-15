import styled from 'styled-components'

const widthOfMainArea = 700
const maxMobileWidth = 750

export const ArticleEditorPageWrapper = styled.div`
        width: 100%;
    `

export const ArticleEditorPageMainArea = styled.div`
        width: ${widthOfMainArea}px;
        @media(max-width:${maxMobileWidth}px){
            width: 100%;
        }
    `

export const ArticleEditorWrapper = styled.div`
        margin-bottom: 10rem;
    `

export const TitleImageWrapper = styled.div`
        width: 100%;
        margin-top: 2rem;
        @media(max-width:${maxMobileWidth}px){
            margin-top: 0;
        }
    `

export const ArticleTitleTextArea = styled.textarea`
        width: 100%;
        margin: 1rem 0;
        padding: 0 0.5rem;
        min-height:2rem;
        font-size:2rem;
        line-height: 1.5;
        word-break: break-all;
        font-weight: bold;
        font-family: Microsoft YaHei;
        overflow: hidden;
        display: block;
        outline: none;
        border: none;
        resize: none;
        ::-webkit-scrollbar {
            display: none;
        }
        ::-webkit-input-placeholder{
             color:#BBBBBB;   
        }
    `

export const ArticleMetaWrapper = styled.div`
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        padding: 0 0.5rem;
    `

export const ArticleMetaInput = styled.input`
        outline: none;
        border: none;
        border-radius: 0.4rem;
        background: ${props => props.backgroundColor};
        padding: 0.4rem 0.6rem;
        font-size: 22px;
        width: 55px;
        line-height: 1.5;
        transition: all 0.4s ease;
        ::-webkit-input-placeholder{
             color:#BBBBBB;   
        }
         @media(max-width:${maxMobileWidth}px){
            margin-bottom: 0.5rem;
        }
    `

export const Gap = styled.span`
        font-size: 1.6rem;
        line-height: 1.5;
        color: #BBBBBB; 
    `

export const TitleLengthWarn = styled.div`
        text-align: right;
        margin-bottom: 1rem;
    `