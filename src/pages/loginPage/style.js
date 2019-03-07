import styled from 'styled-components'

const headerHeight = 70

const milePostWidth4 = 900

const milePostWidth3 = 1200

const milePostWidth2 = 1320

const milePostWidth = 1600

const maxMobileWidth = 750

export const LoginPageWrapper = styled.div`
        display: flex;
        justify-content: center;
        padding: 4rem;
        background: white;
        height: ${props => props.heightOfBrowser - headerHeight}px;
    `

export const ThemeJumbotron = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% - 400px);
        @media(max-width:1000px){
            display: none
        }
    `

export const LogoWrapper = styled.div`
        position: absolute;
        right: 5rem;
        bottom: 2rem;
    `

export const Loginer = styled.div`
        width: 400px;
        padding: 4rem 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `

export const InputWrapper = styled.div`
        margin-bottom: 2rem;
    `

export const CaptchaWrapper = styled.div`
        margin-bottom: 2rem;
        display: flex;
    `
export const CaptchaImage = styled.div`
        margin-right: 1rem;
        width: 10rem;
        background: url(data:image/jpeg;base64,${props => props.captchaImage}) no-repeat;
        background-size: 100% 100%;
    `

export const ThemeImage = styled.img`
        width: 400px;
        margin: 2rem;
        margin-bottom: 8rem;
        box-shadow:rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    `

export const Gap = styled.div`
        width: 0;
        border-right: solid 1px #CCCCCC;
        align-self: stretch;
         @media(max-width:1000px){
            display: none
        }
    `

export const Loading = styled.img`
        transform: scale(0.8)
    `

export const ButtonWrapper = styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 6rem;
        @media(max-height:600px){
         margin-bottom: 0;
        }
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `
