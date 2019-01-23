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
        height:220px;   
    `

export const ArticleTitleTextArea = styled.textarea`
        width: ${widthOfMainArea}px;
        margin: 1rem 0;
        min-height:2rem;
        font-size:2rem;
        word-break: break-all;
        font-weight: bold;
        font-family: Microsoft YaHei;
        line-height: 1.5;
        outline: none;
        overflow: hidden;
        display: block;
        border: none;
        resize: none;
        ::-webkit-scrollbar {
            display: none;
        }
        ::-webkit-input-placeholder{
             color:#BBBBBB;   
        }
    `

export const TitleLengthWarn = styled.div`
        width: ${widthOfMainArea}px;
        text-align: right;
        margin-bottom: 1rem;
    `