import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {CentralController,
        ArticleListWrapper,
        ArticleListFixer,
        Title,
        Header,
        ArticleTitle,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime} from './style'
import {SearchBar,ArticleFiling,ArticleClassification} from './components'
import {createPushPrograssToEndAction} from "../articlePage/store";
import {createTriggerIsLoadingManagePageArticleListDataAction,
        createGetManagePageArticleListDataAction} from "./store";

class ManagePage extends PureComponent {

    render() {

        const {browser} = this.props

        return (
            <Fragment>
                <CentralController>
                    <SearchBar/>
                    <ArticleFiling/>
                    <ArticleClassification/>
                </CentralController>

                <ArticleListWrapper>
                    <ArticleListFixer>

                        <Title>所有文章</Title>
                        <Header>
                            <ArticleTitle>文章标题</ArticleTitle>
                            <ArticleAuthor>作者</ArticleAuthor>
                            <ArticleLabel>标签</ArticleLabel>
                            <ArticleReleaseTime>发表时间</ArticleReleaseTime>
                        </Header>



                    </ArticleListFixer>
                </ArticleListWrapper>
            </Fragment>
        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.pushPrograssBarToEnd()
        },500)
    }

    componentWillUnmount() {

    }

}

const mapState = (state) => ({
        browser:state.get('rootState').get('browser')
    })

const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'managePage'})
            dispatch(pushPrograssBarToEndAction)
        },
        getData(startIndex, pageScale) {
            const triggerIsLoadingManagePageArticleListDataAction = createTriggerIsLoadingManagePageArticleListDataAction(true)
            dispatch(triggerIsLoadingManagePageArticleListDataAction)

            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }

            const getManagePageArticleListDataaction = createGetManagePageArticleListDataAction(value)
            dispatch(getManagePageArticleListDataaction)
        },
    }
}

export default connect(mapState, mapActions)(withRouter(ManagePage))
