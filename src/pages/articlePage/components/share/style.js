import styled from 'styled-components'

const maxMobileWidth = 750

export const ShareWrapper = styled.div`
        display: flex;
        padding: 1rem 2rem;
        width: 100%;
        @media(max-width:${maxMobileWidth}px){
            width: 100%;
        }
    `

export const ShareItem = styled.div`
        margin-right: 1rem;
        font-size: 1.4rem;
        color:${props => props.color ? props.color : 'black'};
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        border: solid 1px #dcdcdc;
        cursor: pointer;
        &:hover{
            background: #dcdcdc;
        }
    `