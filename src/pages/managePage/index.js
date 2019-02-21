import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {CentralController,
        ArticleListWrapper,
        ArticleListFixer,
        Title,
        Header,
        HeaderArticleTitle,
        ArticleTitle,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime,
        ArticleItemWrapper,
        DeleteButton} from './style'
import {SearchBar,
        ArticleFiling,
        ArticleClassification,
        ArticleItem} from './components'
import {createPushPrograssToEndAction} from "../articlePage/store";
import {createTriggerIsLoadingManagePageArticleListDataAction,
        createGetManagePageArticleListDataAction} from "./store";
import {DateFormat} from "../../exJs";

class ManagePage extends PureComponent {

    render() {

        const {articleList} = this.props

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
                            <HeaderArticleTitle>文章标题</HeaderArticleTitle>
                            <ArticleAuthor>作者</ArticleAuthor>
                            <ArticleLabel>标签</ArticleLabel>
                            <ArticleReleaseTime>发表时间</ArticleReleaseTime>
                        </Header>

                        {
                            articleList && articleList.map((item, index) => {
                                return (
                                    <ArticleItem key={item.get('article_id')} article={item}/>
                                )
                            })
                        }

                    </ArticleListFixer>
                </ArticleListWrapper>
            </Fragment>
    )
}

componentDidMount() {
    setTimeout(() => {
        this.props.pushPrograssBarToEnd()
    },500)
    this.props.getData(0,10)
}

componentWillUnmount() {

    }
}

const mapState = (state) => ({
        articleList: state.get('managePage').get('articleList')
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

            const getManagePageArticleListDataAction = createGetManagePageArticleListDataAction(value)
            dispatch(getManagePageArticleListDataAction)
        },
    }
}

export default connect(mapState, mapActions)(withRouter(ManagePage))
