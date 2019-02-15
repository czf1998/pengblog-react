import styled from 'styled-components'

export const NoticeWrapper = styled.div`
        z-index:4;
        position:fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
    `

export const NoticePositioner = styled.div`
        width: auto;
        max-width: 450px;
        margin: 5rem auto;
        padding: 0 1rem;
    `

export const NoticeBody = styled.div`
        word-wrap:break-word;
        width: 100%;
        line-height: 1.5;
        text-align: center;
        padding: 1rem 1rem;
        background: white;
        border-radius: 0.2rem;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    `