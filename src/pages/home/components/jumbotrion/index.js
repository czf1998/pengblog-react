import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-keeper'
import { JumbotronWrapper, JumbotronBackground, Title, Summary, ImageWrapper, ImageFirst, ImageSecond, ImageThird } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { Button } from "../../../../common/button";
import { actionCreators } from './store'

class Jumbotron extends PureComponent {
    constructor(props) {
        super(props)

    }

    render() {

        const { article,
                articleSummary,
                articlePreviewImages
              } = this.props

        const ARTICLE_PAGE_PATH = '/article/'

        return (

                <JumbotronWrapper className={CommonClassNameConstants.COMMON_BORDER_RADIUS}>



                    <Title className={CommonClassNameConstants.CURSORP}>
                        <h1>{article.get('article_title')}</h1>

                    </Title>
                    <Summary className={CommonClassNameConstants.CURSORP}>
                        {articleSummary}
                    </Summary>

                    <Link to={ARTICLE_PAGE_PATH + article.get('article_id')}>
                        <Button color="black"
                                backgroundColor="#eeeeee"
                                margin="15px 0 0 0"
                                borderColor="#DDDDDD" style={{width:'100px'}}>
                            查看全文
                        </Button>
                    </Link>


                    <ImageWrapper>
                        <ImageFirst  className={CommonClassNameConstants.CURSORP +
                        CommonClassNameConstants.HOVER_ENLARGE}
                                     imgUrl={articlePreviewImages.get(0)}/>
                        <ImageSecond  className={CommonClassNameConstants.CURSORP +
                        CommonClassNameConstants.HOVER_ENLARGE}
                                      imgUrl={articlePreviewImages.get(1)}/>
                        <ImageThird  className={CommonClassNameConstants.CURSORP +
                        CommonClassNameConstants.HOVER_ENLARGE}
                                     imgUrl={articlePreviewImages.get(2)}/>
                    </ImageWrapper>
                </JumbotronWrapper>


        )

    }

    componentDidMount() {
        if(this.props.jumbotronDataIsReady)
            return
        this.props.getData(this.props.jumbotronArticleId)
    }

}

const mapState = (state) => ({
    article: state.get('jumbotron').get('article'),
    articleSummary: state.get('jumbotron').get('articleSummary'),
    articlePreviewImages: state.get('jumbotron').get('articlePreviewImages'),
    jumbotronDataIsReady: state.get('home').get('jumbotronDataIsReady')
})

const mapActions = (dispatch) => ({
    getData: (jumbotronArticleId) => {
        let value = {
            article_id: jumbotronArticleId
        }
        const action = actionCreators.createGetJumbotronDataAction(value)
        dispatch(action)
    },
    dispatchRoadedAndShowJumbotronAction: () => {
        const action = actionCreators.createRoadedAndShowJumbotronAction()
        dispatch(action)
    }
})

export default connect(mapState, mapActions)(Jumbotron)