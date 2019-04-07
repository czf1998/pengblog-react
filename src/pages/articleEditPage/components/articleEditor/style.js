import styled from 'styled-components'

const heightOfHeader = 70

export const ArticleEditorWrapper = styled.div`

    `

export const ToolBarWrapper = styled.div`
        position: sticky;
        top: ${heightOfHeader}px;
        background: white;
        z-index: 1;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
        border-top: 1px solid #EBEBEB;    
        border-bottom: 1px solid #EBEBEB;
        ${props => props.isMobile ? `
            position: fixed;
            bottom: 0;
            width: 100%;
            margin-bottom: 0
        ` : ''}
    `

export const ToolBar = styled.div`
      
        font-size: ${props => props.isMobile ? '1.4rem' : '1rem'};
        display: flex;
        justify-content: ${props => props.isMobile ? 'flex-end' : 'center'};
    `

export const TextArea = styled.div`
        min-height: 300px;
    `