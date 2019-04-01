import styled from 'styled-components'



export const ModalItemWrapper = styled.div`
        position: relative;
        background: white;
        box-shadow: 0 5px 25px rgba(0,0,0,.1);
        border-radius: 0.4rem;
        border: none;
        pointer-events: auto;
    `

export const ModalTitle = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        padding: 1rem 2rem;
        border-bottom: solid 1px #F0F0F0;
    `

export const ModalContent = styled.div`
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
        &:hover{
            color: grey;
        }
    `

export const OperationColumn = styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 0.5rem;
        padding-right: 1rem;
        border-top: solid 1px #F0F0F0;
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
        color: ${props => props.isLoading ? 'grey' : '#00AA00'};
        transition: all 0.4s ease;
        pointer-events: ${props => props.isLoading ? 'none' : 'default'};
        transition: all 0.4s ease;
        ${props => props.browser === 'Safari' ? '' : `
            &:hover{
                background: #F7F7F7;
            }
        `}
    `

export const CancelButton = styled(ConfirmButton)`
        color: #AA0000;
        color: ${props => props.isLoading ? 'grey' : '#AA0000'};
        pointer-events: ${props => props.isLoading ? 'none' : 'default'};
        transition: all 0.4s ease;
    `

export const LoadingWraper = styled(ModalContent)`
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `

export const LoadingIcon = styled.img`
        transform: scale(0.8);
    `


