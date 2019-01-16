import styled from 'styled-components'

const widthOfMainArea = 750

export const CommentWrapper = styled.div`
        display: flex;
        align-items: stretch;
        width: ${props => props.widthOfMainArea}px;
        @media(max-width: ${props => props.widthOfMainArea}px) {
            width: 100%;
        }
    `

export const VisitorInfo = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 110px;
        @media(max-width: ${widthOfMainArea}px) {
            min-width: auto
        }
    `

export const AvatarWraper = styled.div`
        margin-top: 0.8rem;
        width: 60px;
        height: 60px;
        border: solid 1px #F7F7F7;
        border-radius: 0.4rem;
        background: #F7F7F7;
    `

export const Avatar = styled.div`
        font-size: 1.45rem;
        font-weight: bold;
        color: ${props => props.metaColor};
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: solid 0.2rem ${props => props.metaColor};
    `

export const Name = styled.div`
        width: 100%;
        
        font-size: 0.9rem;
        line-height: 1.2;
        text-align: center;
        word-wrap: break-word 
        
        margin: 1rem 0;
        padding: 0 1rem;
        
    `

export const Gap = styled.div`
        width: 1px;
        margin: 1rem 0;
        border-right: solid 1px #F7F7F7;
    `

export const MultiContent = styled.div`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    `

export const Content = styled.div`
        line-height: 1.5;
        padding: 0.8rem 1rem;
        padding-right: 0;
        flex-grow: 1;        
    `

export const OperationBar = styled.div`
        padding: 0.8rem 1rem;
        text-align: right;
    `


export const Visitor = styled.div`
        font-weight: bold;
        margin-bottom: 15px;
    `

export const Contentt = styled.div`
        line-height: 1.5;
        margin-left: 10px;
        margin-bottom: 15px;
    `

export const Meta = styled.div`
        text-align: right;
    `
