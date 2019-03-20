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
        position: fixed;
        background: white;
        width: 100%;
        min-height: calc(100% - 70px);
    `

export const ThemeJumbotron = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% - 400px);
        background:url(${props => props.themeImage}) no-repeat center;
        background-size: cover;

        @media(max-width:1000px){
            display: none
        }
    `

export const LogoWrapper = styled.div`
       
    `

export const LoginerWrapper = styled.div`
        width: 400px;
        min-height: 350px;
        margin-bottom: 4rem;
        padding: 4rem 3rem;
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        @media(max-height:600px){
            margin-bottom: 0;
            padding: 1rem 3rem;
            padding-top: 1.5rem;
        }
    `

export const InputWrapper = styled.div`
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
    `

export const GetSmsButtonWrapper = styled.div`
        padding-left: 1rem;
        display: flex;
        justify-content: center;
        align-items: stretch;
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
        width: 550px;
        margin: 2rem;
        margin-bottom: 8rem;
        box-shadow:rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    `

export const Gap = styled.div`
        width: 0;
        border-right: solid 1px #f0f0f0;
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
      
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `

export const LoginBar = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
    `

export const SwitchButton = styled.ul` 
        display: flex;
        margin: 0 3rem;
        
    `

export const Item = styled.li`
        cursor: pointer;
        padding: 1rem 1rem;
        color: grey;
        
        ${props => props.active ? `
            border: solid 1px #dee2e6;
            border-radius: 0.4rem;
            font-weight: bold;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: solid 1px white;
        ` : `
            border: solid 1px white;
            border-bottom: solid 1px #dee2e6;
        `}
        
    `

export const Space = styled.li`
        flex-grow: 1;
        border-bottom: solid 1px #dee2e6;
    `
