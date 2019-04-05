import styled from 'styled-components'

const headerHeight = 70

/*const milePostWidth4 = 900

const milePostWidth3 = 1200

const milePostWidth2 = 1320

const milePostWidth = 1600

const maxMobileWidth = 750*/

export const NoFoundPageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: ${window.innerHeight - headerHeight}px;
    `

export const Image = styled.img`
        width: 300px;
        height: auto;
    `

export const Title = styled.div`
        font-size: 2rem;
        font-weight: 100;
        margin-top: 1.5rem;
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        height: 100%;
        weight: 100%;
    `

