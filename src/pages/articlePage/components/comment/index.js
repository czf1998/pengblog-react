import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CommentWrapper,Visitor,Content,Meta,VisitorInfo,AvatarWraper,Name,Gap,MultiContent,OperationBar,Avatar } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'
import SubComment from '../subComment'


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
                extractFeatureString} = this.props

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
                       <i className="fa fa-reply"/> 回复
                    </span>
                    </OperationBar>
                </MultiContent>

            {/*
                {
                    comment.get('comment_author').get('visitor_siteAddress')
                    &&
                    comment.get('comment_author').get('visitor_siteAddress') !== ''
                    ?
                    <Visitor className={CommonClassNameConstants.FONT_SMALL +
                                        CommonClassNameConstants.CLICKABLE +
                                        CommonClassNameConstants.HOVER_UNDERLINE}>
                        <span onClick={this.redirectToVisitorSite}>
                            {comment.get('comment_author').get('visitor_name')}
                        </span>
                    </Visitor>
                    :
                    <Visitor className={CommonClassNameConstants.FONT_SMALL}>
                        {comment.get('comment_author').get('visitor_name')}
                    </Visitor>
                }

                {
                    comment.get('comment_referComment') && comment.get('comment_referComment') !== '' && <SubComment comment={comment.get('comment_referComment')}/>
                }

                <Content className={CommonClassNameConstants.FONT_SMALL}>
                    {comment.get('comment_content')}
                </Content>

                <Meta className={CommonClassNameConstants.FONT_DARK +
                                 CommonClassNameConstants.FONT_SMALL}>
                    {GetDateDiff(comment.get('comment_releaseTime'))}
                    &nbsp;|&nbsp;
                    <span className={CommonClassNameConstants.CLICKABLE} onClick={clickReferHandler}>
                       <i className="fa fa-reply"/> 回复
                    </span>
                </Meta>*/}
            </CommentWrapper>
        );
    }

     redirectToVisitorSite() {
         window.open('http://' + this.props.comment.get('comment_author').get('visitor_siteAddress'))
    }
}



const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        colorPicker: state.get('comment').get('colorPicker'),
        extractFeatureString: state.get('comment').get('extractFeatureString')
    }
}


export default connect(mapState)(Comment)