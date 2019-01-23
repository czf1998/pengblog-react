import styled from 'styled-components'

export const TitleImageWrapper = styled.div`
        background-color: #F7F7F7;
        position: relative;
        height: 100%;
        ::after{
            pointer-events: none;
            color: rgb(179, 179, 179);
            width: 100%;
            content:'添加题图';
            text-align: center;
            position: absolute;
            left: 0;
            bottom: 30%;
            opacity: 0;
            transform: translateY(-12px);
            transition: all 0.2s ease 0s;
        }
         &:hover::after{
            opacity: 1;
            transform: translateY(0);
        }
    `

export const TitleImageFrame = styled.div`
        pointer-events: none;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `

export const ButtonIcon = styled.div`
       
    `

export const TitleImageInput = styled.input`
        display: none;
    `

export const TitleImageInputLabel = styled.label`
        width: 100%;
        height: 100%;
    `