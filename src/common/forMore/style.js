import styled from 'styled-components'

export const ForMoreWrapper = styled.div`
        font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
        width: ${props => props.widthOfMainArea}px;
        height: ${props => props.height ? props.height : 100}px;
        color: #175199;
        transition: all 0.5s ease;
    `