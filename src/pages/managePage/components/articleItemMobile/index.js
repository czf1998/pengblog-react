import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {} from './style'
import {} from './store'
import {ArticleItemMobileWrapper,
        ArticleLabelAndTitle,
        Label,
        Title,
        ArticleAuthorAndReleaseTime,
        Author,
        ReleaseTime,
        DeleteButtonWraper,
        DeleteButton} from "./style";
import {DateFormat} from "../../../../exJs";



class ArticleItemMobile extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isBeingHover: false
        }
        this.mouseBehaviourHandler = this.mouseBehaviourHandler.bind(this)
    }

    render() {

        const {article,goTo} = this.props


        return (
            <ArticleItemMobileWrapper onClick={() => {goTo('/article/' + article.get('article_id'))}}>

                <ArticleLabelAndTitle>

                    <Label>
                        [{article.get('article_label')}]
                    </Label>&nbsp;

                    <Title>
                        {article.get('article_title')}
                    </Title>

                </ArticleLabelAndTitle>

                <ArticleAuthorAndReleaseTime>

                    <Author>
                        by: {article.get('article_author')}
                    </Author>&nbsp;|&nbsp;

                    <ReleaseTime>
                        {DateFormat('yyyy-MM-dd',new Date(article.get('article_releaseTime')))}
                    </ReleaseTime>

                </ArticleAuthorAndReleaseTime>

                <DeleteButtonWraper>
                    <DeleteButton className="fa fa-close"/>
                </DeleteButtonWraper>

            </ArticleItemMobileWrapper>
        );
    }

    componentDidMount(){

    }

    mouseBehaviourHandler(flag){
       this.setState({
           isBeingHover: flag
       })
    }
}



const mapState = (state) => {
    return  {
        goTo: state.get('router').get('goTo'),
        browser: state.get('rootState').get('browser')
    }
}

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(ArticleItemMobile)
