import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {ArticleClassificationWrapper,Title,Tags,TagItem} from './style'
import {createAppointCurrentLabelAction} from './store'



class ArticleClassification extends PureComponent {

    render() {

        const {articleLabelObjList,appointCurrentLabel,currentLabel,dataGetter,browser} = this.props

        return (
            <ArticleClassificationWrapper>
                <Title>TAG</Title>
                <Tags browser={browser}>

                    {
                        articleLabelObjList && articleLabelObjList.map((item) => {
                            return <TagItem key={item.get('article_label')}
                                            isCurrent={currentLabel === item.get('article_label')}
                                            onClick={() => {appointCurrentLabel(item.get('article_label'),dataGetter)}}>
                                        {item.get('article_label') + '(' + item .get('number') + ')'}
                                    </TagItem>
                        })
                    }
                </Tags>
            </ArticleClassificationWrapper>
        );
    }

    componentDidMount(){
    }
}



const mapState = (state) => {
    return  {
        currentLabel: state.get('managePage').get('currentLabel'),
        browser: state.get('rootState').get('browser')
    }
}

const mapActions = (dispatch) => ({
    appointCurrentLabel(label,dataGetter){

        const action = createAppointCurrentLabelAction(label)
        dispatch(action)
        dataGetter()
    }
})

export default connect(mapState, mapActions)(ArticleClassification)

