import styled from 'styled-components'

const modalBodyWidth = 350

export const ModalWrapper = styled.div`
        z-index: 4;
        position: fixed;
        display: flex;
        flex-direction: center;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    `

export const ModalCover = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.1);
        transition: all 1s ease;
        pointer-events: auto;
    `

export const ModalBodyWrapper = styled.div`
        width: 350px;
        position: relative;
        background: white;
        margin-bottom: 3rem;
        box-shadow: 0 5px 25px rgba(0,0,0,.1);
        border-radius: 0.4rem;
        border: 1px solid rgba(0,0,0,.1);
        pointer-events: auto;
    `


export const ModalContent = styled.div`
         width: ${modalBodyWidth}px;
         padding: 1rem 2rem;
         font-size: 1rem;
         line-height: 1.5;
    `

export const CloseButton = styled.div`
        position: absolute;
        transform: scale(1.5);
        top: 1rem;
        right: 1rem;
        cursor: pointer;
        color: #EEEEEE;
        pointer-events: ${props => props.isLoading ? 'none' : 'default'};
        &:hover{
            color: grey;
        }
    `


export const ConfirmButton = styled.div`
        height: 2.4rem;
        padding: 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-left: 1rem;
        border: solid 1px #F0F0F0;
        border-radius: 0.4rem;
        color: #00AA00;
        ${props => props.browser === 'Safari' ? '' : `
            &:hover{
                background: #F7F7F7;
            }
        `}
    `
