import React, {PureComponent,Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {ArticleItemWrapper,
        Article,
        DateOfBeingDeleted,
        RecoverButton,
        Header,
        RecoverButtonWrapper} from './style'
import { DateFormat } from "../../../../exJs"
import {createRecoverArticleAction} from "./store";
import {SLIDE_UP_FAST} from "../../../../commonStyle/commonClassNameConstant";
import {createTriggerIsLoadingAction} from "../../../ipManagePage/store";



class ArticleItem extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            isRecovered: false,
            isLoading: false
        }
    }

    render() {

        const {article, withHeader, tryToRecoverThisArticle} = this.props

        const {isRecovered,isLoading} = this.state

        const article_title = article.get('article_title')
        const article_label = article.get('article_label')
        const article_author = article.get('article_author')
        const article_id = article.get('article_id')
        const article_deleteTime = article.get('article_deleteTime')


        return (
            <Fragment>

                {
                    withHeader &&
                    <Header>
                        <Article>项目</Article>
                        <DateOfBeingDeleted>删除时间</DateOfBeingDeleted>

                        <RecoverButtonWrapper>操作</RecoverButtonWrapper>
                    </Header>
                }

                <ArticleItemWrapper  className={SLIDE_UP_FAST} >
                    <Article>
                        {
                            '[' + article_label + ']' + article_title + '(' + article_author + ')'
                        }
                    </Article>

                    <DateOfBeingDeleted>
                        {DateFormat('yyyy-MM-dd hh:mm',new Date(article_deleteTime))}
                    </DateOfBeingDeleted>

                    <RecoverButtonWrapper>

                                <RecoverButton isLoading={isLoading}
                                               disabled={isRecovered || isLoading}
                                               width="5rem"
                                               onClick={() => tryToRecoverThisArticle(article_id, this)}>
                                    recover
                                </RecoverButton>
                    </RecoverButtonWrapper>
                </ArticleItemWrapper>
            </Fragment>

        )
    }

}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile')
})

const mapActions = (dispatch) => {
    return {
        tryToRecoverThisArticle(article_id, _this) {

            const isLoadingValue = {
                isLoadingId: 'recycleBinPage',
                isLoading: true
            }

            const triggerRecycleBinPageLoadingAction = createTriggerIsLoadingAction(isLoadingValue)

            dispatch(triggerRecycleBinPageLoadingAction)

            _this.setState({
                isLoading: true
            })

            //向saga发送请求
            const value = {
                article_id: article_id,
                postHandler: () => {
                    _this.setState({
                        isRecovered: true,
                        isLoading: false
                    })
                }
            }
            const action = createRecoverArticleAction(value)

            dispatch(action)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(ArticleItem))
