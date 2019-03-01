import styled from 'styled-components'

const heightOfHeader = 70

const milePostWidth = 1000

export const ThemeJumbotronWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
    `

export const LogoAndSimpleDescription = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding-top: 3rem;
        padding-bottom: 2rem;
        height: ${props => props.heightOfBrowser - heightOfHeader}px;
    `

export const ThemeImage = styled.img`
        width: 60%;
        margin-bottom: 3rem;
        @media(max-width:${milePostWidth}px){
            width: 80%;
        }
    `

export const LogoAndSimpleDescriptionFixer = styled.div`
        display: flex;
        justify-content: center;
    `

export const LogoWrapper = styled.div`
        display: flex;
        align-items: flex-end;
        padding-bottom: 2rem;
    `

export const Gap = styled.div`
        width: 0;
        border-right: solid 1px grey;
        align-self: stretch;
    `

export const SimpleDescription = styled.div`
        font-size: 1.8rem;
        font-weight: 100;
        padding-left: 1rem;
    `

export const SponsorDisplayCabinet = styled(LogoAndSimpleDescription)`
        flex-direction: column;
        align-items: center;
        background: #F7F7F7;
        padding-top: 2rem;
    `

export const PowerBy = styled.div`
        font-size: 1.4rem;
        color: #999;
        margin-bottom: 1rem;
    `

export const SponsorContain = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        justify-content: center;
    `

export const SponsorItem = styled.img`
        height: 3rem;
        margin: 0.5rem 1rem;
    `