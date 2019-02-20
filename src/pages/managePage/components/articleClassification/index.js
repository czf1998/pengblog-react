import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {ArticleClassificationWrapper,Title,Tags,TagItem} from './style'
import {} from './store'



class ArticleClassification extends PureComponent {

    render() {

        const {} = this.props

        return (
            <ArticleClassificationWrapper>
                <Title>文章TAG</Title>
                <Tags>
                    <TagItem>杂谈(23)</TagItem>
                    <TagItem>转载(22)</TagItem>
                    <TagItem>技术(18)</TagItem>
                    <TagItem>随想(12)</TagItem>
                    <TagItem>音乐(8)</TagItem>
                    <TagItem>影评(7)</TagItem>
                    <TagItem>游记(2)</TagItem>
                    <TagItem>游戏(2)</TagItem>
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

