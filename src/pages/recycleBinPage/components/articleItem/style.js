import styled from 'styled-components'
import {Button} from "../../../../common/button";


export const ArticleItemWrapper = styled.div`
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

export const Article = styled.div`
        color: ${props => props.isRecovered ? '#00AA00' : 'black'};
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding 0.5rem 1rem;
    `

export const DateOfBeingDeleted = styled(Article)`
        color: ${props => props.isRecovered ? 'grey' : 'black'};
        width: 30%;
        justify-content: center;
    `
export const RecoverButtonWrapper = styled(Article)`
        display: flex;321321321
        white-space: nowrap;
        width: 20%;
        justify-content: center;
    `

export const RecoverButton = styled(Button)`
        ${props => props.isLoading ? 'z-index: -1' : ''};
    `