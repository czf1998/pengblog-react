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

export const Email = styled.div`
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
    `

export const WechatQrcodeWrapper = styled.div`
        display: flex;
        justify-content: center;
    `

export const WechatQrcode = styled.img`
        width: 180px;
        height: 180px;
        margin-bottom: 1rem;
    `
