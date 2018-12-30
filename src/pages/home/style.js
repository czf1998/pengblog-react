import styled from 'styled-components'

export const HomeWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f7f7f7;
    `
export const Gap = styled.div`
        height: ${props => props.gapHeight};
        width: ${props => props.widthOfMainArea};
      
    `
