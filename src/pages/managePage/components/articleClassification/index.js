import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {ArticleClassificationWrapper,Title,Tags,TagItem} from './style'
import {} from './store'



class ArticleClassification extends PureComponent {

    render() {

        const {articleLabelObjList} = this.props

        return (
            <ArticleClassificationWrapper>
                <Title>文章TAG</Title>
                <Tags>

                    {
                        articleLabelObjList && articleLabelObjList.map((item,index) => {
                            return <TagItem key={item.get('article_label')}>
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
        year: state.get('select').get('year'),
        month: state.get('select').get('month')
    }
}

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(ArticleClassification)

