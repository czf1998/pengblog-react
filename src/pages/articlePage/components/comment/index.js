import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import {CommentWrapper,
        Content,
        VisitorInfo,
        AvatarWraper,
        Name,
        Gap,
        MultiContent,
        OperationBar,
        Avatar,
        GapH } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'
import SubComment from '../subComment'
import { createGetSubCommentListDataAction } from './store'


class Comment extends PureComponent {

    constructor(props) {
        super(props)
        this.redirectToVisitorSite = this.redirectToVisitorSite.bind(this)
    }

    render() {

        const { widthOfMainArea,
                comment,
                clickReferHandler,
                colorPicker,
                extractFeatureString,
                subComment} = this.props

        const visitor_name = comment.get('comment_author').get('visitor_name')
        const metaColor = colorPicker(visitor_name)
        const featureString = extractFeatureString(visitor_name)

        return (
            <CommentWrapper className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}
                            widthOfMainArea={widthOfMainArea}>


                <VisitorInfo>

                    <AvatarWraper>
                        <Avatar className={CommonClassNameConstants.FLEX_ROW_CENTER} metaColor={metaColor}>
                            {featureString}
                        </Avatar>
                    </AvatarWraper>

                    <Name>
                        {comment.get('comment_author').get('visitor_name')}
                    </Name>

                </VisitorInfo>

                <Gap/>

                <MultiContent>

                    <Content>
                        {comment.get('comment_content')}
                    </Content>

                    <OperationBar  className={CommonClassNameConstants.FONT_DARK }>
                        {GetDateDiff(comment.get('comment_releaseTime'))}
                        &nbsp;|&nbsp;
                        <span className={CommonClassNameConstants.CLICKABLE} onClick={clickReferHandler}>
                       <i className="fa fa-reply"/>
                    </span>
                    </OperationBar>

                    {   subComment.get('subCommentMapper').get(comment.get('comment_id').toString())
                        &&
                        subComment.get('subCommentMapper').get(comment.get('comment_id').toString()).map((item) => {
                            return (
                                <div key={item.get('comment_id')} className={CommonClassNameConstants.SLIDE_UP_FAST}>
                                    <GapH/>
                                    <SubComment comment={item}/>
                                </div>

                            )
                        })
                    }

                </MultiContent>

            </CommentWrapper>
        );
    }

     redirectToVisitorSite() {
         window.open('http://' + this.props.comment.get('comment_author').get('visitor_siteAddress'))
    }

    componentDidMount(){
        const comment_id = this.props.comment.get('comment_id')
        const startIndex = 0
        const pageScale = this.props.subComment.get('pageScale')

        this.props.subComment.get(comment_id) === undefined
        &&
        this.props.comment.get('comment_haveSubComment') === true
        &&
        this.props.getSubCommentListData(comment_id, startIndex, pageScale)
    }
}



const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        colorPicker: state.get('comment').get('colorPicker'),
        extractFeatureString: state.get('comment').get('extractFeatureString'),
        subComment: state.get('subComment')
    }
}

const mapActions = (dispatch) => ({
    getSubCommentListData(comment_id, startIndex, pageScale){
        const value = {
            comment_id: comment_id,
            startIndex: startIndex,
            pageScale: pageScale
        }
        const getSubCommentListDataAction = createGetSubCommentListDataAction(value)
        dispatch(getSubCommentListDataAction)
    }
})


export default connect(mapState, mapActions)(Comment)