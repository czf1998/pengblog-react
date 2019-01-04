import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
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

        return (

                <JumbotronWrapper className={CommonClassNameConstants.COMMON_BORDER_RADIUS}>



                    <Title className={CommonClassNameConstants.CURSORP}>
                        {article.get('article_title')}

                    </Title>
                    <Summary className={CommonClassNameConstants.CURSORP}>
                        {articleSummary}
                    </Summary>

                    <Button color="black"
                            backgroundColor="#eeeeee"
                            margin="15px 0 0 0"
                            borderColor="#DDDDDD" style={{width:'100px'}}>查看全文</Button>

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
        this.props.getData(this.props.jumbotronArticleId)
    }

    componentDidUpdate() {
        this.props.dispatchRoadedAndShowJumbotronAction()
    }
}

const mapState = (state) => ({
    article: state.get('jumbotron').get('article'),
    articleSummary: state.get('jumbotron').get('articleSummary'),
    articlePreviewImages: state.get('jumbotron').get('articlePreviewImages')
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