import styled from 'styled-components'
import {Button} from "../../../../common/button";


export const IpItemWrapper = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;    
    `

export const Header = styled.div`
        display: flex;
        align-items: center;
         justify-content: space-between; 
        border-bottom: solid 1px #F0F0F0;
        padding 1rem 0;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
    `

export const Ip = styled.div`
        color: ${props => props.isLifted ? '#00AA00' : 'black'};
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding 0.5rem 1rem;
    `

export const DateOfBeingBanned = styled(Ip)`
        color: ${props => props.isLifted ? 'grey' : 'black'};
        width: 30%;
        justify-content: center;
    `
export const LiftedButtonWrapper = styled(Ip)`
        white-space: nowrap;
        width: 20%;
        justify-content: center;
    `

export const LiftedButton = styled(Button)`
        ${props => props.isLoading ? 'z-index: -1' : ''};
    `