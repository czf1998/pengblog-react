import styled from 'styled-components'

export const LogouterWrapper = styled.div`
        width: 400px;
        min-height: 350px;
        margin-bottom: 4rem;
        padding: 4rem 3rem;
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        @media(max-height:600px){
            margin-bottom: 0;
            padding: 1rem 3rem;
        }
    
    `

export const Title = styled.div`
         font-size: 1.2rem;
        font-weight: bold;
        padding-bottom: 0.8rem;
        margin-bottom: 1rem;
        border-bottom: solid 1px #f0f0f0;
    `

export const Info = styled.div`
        display: flex;
        justify-content: space-between;
        color: grey;
        padding-bottom: 0.5rem;
    `

export const CurrentAutoInfo = styled.div`
        padding: 1rem 0;
    `