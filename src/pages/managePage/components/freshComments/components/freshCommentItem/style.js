import styled from 'styled-components'



export const FreshCommentItemWrapper = styled.div`
        position: relative;
        border: solid 1px #CCCCCC;
        border-radius: 0.4rem;
        padding: 0.5rem;
        padding-top: 0;
        cursor: pointer;
        color:grey;
        font-size:0.9rem;
        margin-top: 0.5rem;
        background: ${props => props.isLoading ? '#F7F7F7' : (props.isBanned ? '#F7F7F7' : 'white')};
    `

export const DeleteButton = styled.i`
        margin-right:0.5rem;
        &:hover{
            color: black;
        }
    `

export const CommentSubject = styled.div`
        padding: 0.3rem;
        line-height: 1.5;
        display: -webkit-box;
        /*autoprefixer: next*/
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
          &:hover{
            color: black;
        }
    `

export const Visitor = styled.span`
        text-decoration: ${props => props.isBanned ? 'line-through' : 'none'};
    `

export const Content = styled.span`
        text-decoration: ${props => props.isBanned ? 'line-through' : 'none'};
    `

export const HostArticle = styled.div`
        position: relative;
        border: none;
        border-radius: 0.4rem;
        background: #F0F0F0;
          &:hover{
            color: black;
        }
       
        &:after{
            content: '';
            width: 0;
            height: 0;
            border: 7px solid transparent;
            border-bottom-color:#F0F0F0;
            position: absolute;
            left: 15px;
            top: -14px;
        }
    `

export const HostArticleInner = styled.div`
        padding: 0.2rem;
        line-height: 1.5;
        display: -webkit-box;
        /*autoprefixer: next*/
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
    `

export const Label = styled.span``

export const Title = styled.span``

export const LoadingIcon = styled.img`
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        top: calc(50% - 0.75rem);
        left: calc(50% - 0.75rem);
    `

export const OperationColumn = styled.div`
        margin-top: 0.5rem;
        display: flex;
        justify-content: flex-end;
    `

export const BanButton = styled(DeleteButton)`

    `

export const LiftedButton = styled.span`
        &:hover{
            color: black;
        }
    `