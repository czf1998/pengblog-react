import styled from 'styled-components'

const gapLineColor = '#F7F7F7'

export const GapLine = styled.div`
        height: 1px;
        margin: 0 2rem;
        border-bottom: solid 2px ${gapLineColor};
    `

export const GapLineVertical = styled.div`
        width: 2px;
        padding: 1rem 0;
        border-left: solid 2px ${gapLineColor};
    `