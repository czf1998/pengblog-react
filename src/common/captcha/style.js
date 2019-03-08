import styled from 'styled-components'


export const CaptchaWrapper = styled.div`
        margin-bottom: 2rem;
        display: flex;
    `

export const CaptchaImage = styled.div`
        position: relative;
        margin-right: 1rem;
        width: 10rem;
        height: 100%;
        cursor: pointer;
        filter: brightness(${props => props.isLoading ? '90%' : '100%'});
        background: url(data:image/jpeg;base64,${props => props.captchaImage}) no-repeat;
        background-size: 100% 100%;
    `

export const LoadingIconWrapper = styled.div`
        position: absolute;
        transform: scale(1.4);
        width: 1.5rem;
        height: 1.5rem;
        left: calc(50% - 0.75rem);
        top: calc(50% - 0.75rem);
        display: flex;
        justify-content: center;
        align-items: center;
    `

export const LoadingIcon = styled.i`
        color: white;
    `