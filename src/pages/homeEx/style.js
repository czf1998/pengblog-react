import styled from 'styled-components'

const headerHeight = 70

const milePostWidth4 = 900

const milePostWidth3 = 1200

const milePostWidth2 = 1320

const milePostWidth = 1600

const maxMobileWidth = 750

export const HomeEXWrapper = styled.div`
       
    `

export const ArticleListWrapper = styled.div`
        position: fixed;
        top: ${headerHeight}px;
        bottom: 0;
        left: 0;
        width: 450px;
        overflow-y: ${props => props.browser === 'Edge' ? 'auto' : 'overlay'};
        border-right: solid 1px #F0F0F0;
        ${props => props.browser !== 'Safari' ? `&::-webkit-scrollbar{
            width:2px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
        
        }` : ''}
        
         
         @media(max-width:${milePostWidth}px){
            width: 350px;
        }
      
       
         @media(max-width:${milePostWidth4}px){
            width: 300px;
        }
        
        
        @media(max-width:${maxMobileWidth}px){
            position: static;
            width: 100%;
            &::-webkit-scrollbar{
                width:0;
                height:0;
            }
        }
    `


export const ArticleDetailWrapper = styled.div`
        display: flex;
        justify-content: center;
        width: calc(100% - 200px);
        margin-left: 200px;
        
        @media(max-width:${milePostWidth}px){
            margin-left: 350px;
            width: calc(100% - 350px);
        }
        
        @media(max-width:${milePostWidth4}px){
             margin-left: 300px;
            width: calc(100% - 300px);
        }
        
         @media(max-width:${maxMobileWidth}px){
            display: none;
        }
    `

export const ArticleDetailFixer = styled.div`
        width: 700px;
        max-width: 100%;
        @media(max-width:${milePostWidth2}px){
           width: 650px;
        }
        @media(max-width:${milePostWidth4}px){
           width: 100%;
        }
        
        @media(min-width:${milePostWidth}px){
            width: 900px;
        }
    `

export const LoadingWrapper = styled.div`
        width: 100%;
        height: ${window.innerHeight - headerHeight}px;
    `

export const ThemeJumbotronWrapper = styled.div`

        margin-left: 450px;
        width: calc(100% - 450px);

        @media(max-width:${milePostWidth}px){
            margin-left: 350px;
            width: calc(100% - 350px);
        }

        @media(max-width:${milePostWidth4}px){
            margin-left: 300px;
            width: calc(100% - 300px);
        }
        
       
    `