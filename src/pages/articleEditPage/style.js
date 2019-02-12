import styled from 'styled-components'

const widthOfMainArea = 700

export const ArticleEditorPageWrapper = styled.div`

    `

export const ArticleEditorWrapper = styled.div`
        width: ${widthOfMainArea}px;
    `

export const TitleImageWrapper = styled.div`
        width: ${widthOfMainArea}px;
        margin-top: 2rem;
    `

export const ArticleTitleTextArea = styled.textarea`
        width: ${widthOfMainArea}px;
        margin: 1rem 0;
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
        width: ${widthOfMainArea}px;
        margin-bottom: 1rem;
    `

export const ArticleMetaInput = styled.input`
        outline: none;
        border: none;
        font-size: 26px;
        width: 55px;
        line-height: 1.5;
        transition: all 0.4s ease;
        ::-webkit-input-placeholder{
             color:#BBBBBB;   
        }
    `

export const Gap = styled.span`
        font-size: 1.6rem;
        line-height: 1.5;
        color: #BBBBBB; 
    `

export const TitleLengthWarn = styled.div`
        width: ${widthOfMainArea}px;
        text-align: right;
        margin-bottom: 1rem;
    `