import styled from 'styled-components'

export const NoticeWrapper = styled.div`
        z-index:2;
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
    `

export const NoticeBody = styled.div`
        width: 100%;
        line-height: 1.5;
        text-align: center;
        padding: 1rem 0;
        background: white;
        border-radius: 0.2rem;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    `