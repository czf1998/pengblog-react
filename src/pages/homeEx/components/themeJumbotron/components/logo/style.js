import styled from 'styled-components'

const milePostWidth = 800

export const LogoWrapper = styled.div`
        width: 100%;
        position: relative;
        margin-right: 1rem;
        font-size: 1.7rem;
        font-weight: 100;
    `

export const Elem1 = styled.div`
        text-align: right;
        border-bottom: solid 1px #3367d6;
    `

export const Elem2 = styled.div`
        padding-top: 0.5rem;
        font-size: 1.4rem;
        color: #0066AA;
        font-weight: bold;
        @media(max-width:${milePostWidth}px){
            font-size: 1.3rem;
        }
    `