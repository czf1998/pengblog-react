import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {FreshCommentItemWrapper,
        CommentSubject,
        Visitor,
        Content,
        HostArticle,
        Label,
        Title} from './style'
import {} from './store'



class FreshCommentItem extends PureComponent {

    render() {

        const {comment} = this.props

        return (
            <FreshCommentItemWrapper>

                <CommentSubject>
                    <Visitor>{comment.get('comment_author').get('visitor_name')}</Visitor>&nbsp;
                    <Content>{comment.get('comment_content')}</Content>
                </CommentSubject>

                <HostArticle>
                    <Label>[{comment.get('comment_hostArticle').get('article_label')}]</Label>&nbsp;
                    <Title>{comment.get('comment_hostArticle').get('article_title')}</Title>
                </HostArticle>

            </FreshCommentItemWrapper>
        );
    }

    componentDidMount(){

    }

    componentDidUpdate(preProps){

    }
}



const mapState = (state) => {
    return  {

    }
}

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(FreshCommentItem)

