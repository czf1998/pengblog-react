import styled from 'styled-components'

export const PaginationWrapper = styled.div`
        border: solid 1px #DDDDDD;
        border-radius: 0.4rem;
        display: flex;
    `

export const GoToFirstPageIcon = styled.div`
        height: 2rem;
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        transition: all 1s ease;
        border-radius: 0.4rem;
        cursor: pointer;
        &:hover{
            background: #DDDDDD;
        }
    `

export const GoToEndPageIcon = styled(GoToFirstPageIcon)`
        border-left:  solid 1px #DDDDDD; 
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    `

export const GoToLastIcon = styled(GoToFirstPageIcon)`
        border-left:  solid 1px #DDDDDD; 
        border-radius: 0;
    `

export const GoToNextIcon = styled(GoToLastIcon)``

export const Item = styled(GoToLastIcon)`
        color: ${props => props.isCurrentPage ? '#3367d6' : 'black'};
    `

export const ThereAreMore = styled(GoToLastIcon)`
        cursor: default;
        &:hover{
            background: white;
        }
    `


