import styled from 'styled-components'

const maxMobileWidth = 800

const hightOfHeader = 70

export const Title = styled.div`
        padding: 1rem 2rem;
        padding-bottom: 0;
        font-size: 1.5rem;
        font-weight: 100;
        align-self: flex-start;
    `

export const IpManagePageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;    
    `

export const MainArea = styled.div`
        padding 1rem 2rem;
        min-height: ${window.innerHeight - 2*hightOfHeader}px;
        width: 700px;
        @media(max-width:${maxMobileWidth}px){
            width: 100%;
            padding 1rem
        }
    `

export const PaginationFixer = styled.div`
        z-index:1;
        margin-bottom: 1rem;
    `

export const LoadingWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
`