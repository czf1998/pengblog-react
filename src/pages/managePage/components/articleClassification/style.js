import styled from 'styled-components'

const widthOfMainArea = 750
const maxMobileWidth = 750

const backgroundColor = '#F7F7F7'

export const ArticleClassificationWrapper = styled.div`
        padding: 1rem 2rem;
        width: 100%;
    `

export const Title = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        padding-bottom: 0.8rem;
        margin-bottom: 1rem;
        border-bottom: solid 1px #f0f0f0;
    `

export const Tags = styled.div`
        display: flex;
        flex-wrap: wrap;
        max-height: 6.4rem;
        overflow-Y: scroll;
         ${props => props.browser !== 'Safari' ? `

        &::-webkit-scrollbar{
            width:2px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
        
        }` 
        : ''}
    `

export const TagItem = styled.div`
        padding: 0.5rem
        margin-right: 0.3rem;
        margin-bottom: 0.3rem;
        font-size: 0.8rem;
        border: solid 1px grey;
        border-radius: 0.4rem;
        cursor: pointer;
        background: ${props => props.isCurrent ? '#F7F7F7' : 'white'};
        &:hover{
            background: #F7F7F7;
        }
    `

