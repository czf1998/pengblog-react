import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { HomeWrapper, Gap } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";

class Home extends PureComponent {

    constructor(props) {
        super(props)

    }

    render() {

        const {basicUIFeatures,
                articleList,
                isMobile,
                isLoading,
                startIndex,
                pageScale,
                maxPage,
                currentPage,
                jumbotronArticleId,
                jumbotronArticleIdDefault,
                animateTime} = this.props

        return (
            <HomeWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>

                {
                    !isMobile &&
                    <Fragment>
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                                {
                                    jumbotronArticleId !== jumbotronArticleIdDefault
                                    &&
                                    <CSSTransition in={true}
                                                   classNames={CommonClassNameConstants.ZOOM}
                                                   appear={true}
                                                   timeout={animateTime}>
                                        <Jumbotron jumbotronArticleId={jumbotronArticleId}/>
                                    </CSSTransition>
                                }
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="20px"/>
                    </Fragment>
                }

                <TransitionGroup className={CommonClassNameConstants.TRANSITION_GROUP_PATCH}>
                    {
                        articleList.map((item, index) => {
                            if( !isMobile && index === 0)
                                return
                            return (
                                <CSSTransition
                                    key={item.get('article_title')}
                                    timeout={animateTime}
                                    classNames={CommonClassNameConstants.SLIDE_UP_GROUP}>
                                    <Fragment>
                                        {
                                            isMobile ?
                                                <ArticleSummaryMobile article={item}/>
                                                :
                                                <ArticleSummary article={item}/>
                                        }
                                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                                    </Fragment>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>


                <ForMore isLoading={isLoading}
                         noMore={currentPage === maxPage}
                         clickHandler={this.props.getMoreArticleListData.bind(this)}
                         meta={[startIndex,
                                pageScale,
                                maxPage,
                                currentPage,
                                isLoading]}/>
            </HomeWrapper>
        )
    }

    componentDidMount() {
        if(this.props.articleListDataIsReady)
            return
        this.props.getData(this.props.startIndex, this.props.pageScale)
    }

}

const mapState = (state) => ({
        startIndex: state.get('home').get('startIndex'),
        pageScale: state.get('home').get('pageScale'),
        maxPage: state.get('home').get('maxPage'),
        currentPage: state.get('home').get('currentPage'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        articleList: state.get('home').get('articleList'),
        isMobile: state.get('rootState').get('isMobile'),
        jumbotronArticleId: state.get('home').get('jumbotronArticleId'),
        jumbotronArticleIdDefault: state.get('home').get('jumbotronArticleIdDefault'),
        isLoading: state.get('home').get('isLoading'),
        loadedAndShowJumbotron: state.get('home').get('loadedAndShowJumbotron'),
        animateTime: state.get('rootState').get('basicUIFeatures').get('animateTime'),
        minHeight: state.get('rootState').get('heightOfBrowser'),
        articleListDataIsReady: state.get('home').get('articleListDataIsReady')
    })

const mapActions = (dispatch) => {
    return {
        getData(startIndex, pageScale) {
            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }
            const action = actionCreators.createGetHomeDataAction(value)
            dispatch(action)
        },
        getMoreArticleListData(startIndex, pageScale, maxPage, currentPage, isLoading){
            console.log(this)
            if(maxPage === currentPage || isLoading)
                return
            this.props.getData(startIndex, pageScale)
        }
    }
}

export default connect(mapState, mapActions)(Home)
