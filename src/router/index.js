import React, {PureComponent, Fragment} from 'react';
import {  Router, Route ,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history'
import ArticlePageLoadable from '../pages/articlePage/loadable'
import ArticleEditPageLoadable from '../pages/articleEditPage/loadable'
import HomeEXLoadable from '../pages/homeEx/loadable'
import ManagePageLoadable from '../pages/managePage/loadable'
import { Header } from '../common'

class RouterComponent extends PureComponent {

    render() {

        const {isMobile} = this.props

        return (
            <Router history={history}>
                <Fragment>
                    <Header/>

                    {/*<Route exact path='/article/:article_id' component={ArticlePageLoadable}/>*/}
                    <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                    <Route exact path='/edit' component={ArticleEditPageLoadable}/>
                    <Route exact={isMobile} path='/home' component={HomeEXLoadable}/>
                    <Route exact path='/article/:article_id' component={ArticlePageLoadable}/>
                    <Route exact path='/manage' component={ManagePageLoadable}/>
                </Fragment>
            </Router>
        );
    }

    componentDidUpdate(){
        console.log(history.location.pathname)
        appointDocumentTitle(history.location.pathname,this.props.currentArticle)
    }
}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile'),
    prograssBarManager: state.get('prograssBar').get('prograssBarManager'),
    currentArticle: state.get('articlePage').get('article')
})

export default connect(mapState,null)(RouterComponent);

const appointDocumentTitle = (path,currentArticle) => {
    if(path === '/home'){
        document.title = '彭凯帆的个人网站'
        return
    }
    if(path === '/manage'){
        document.title = '彭凯帆的个人网站-索引'
        return
    }
    if(path.match(/^\/home\/article/) !== null){
        document.title = currentArticle.get('article_title')
        return
    }
    if(path.match(/^\/article/) !== null){
        document.title = currentArticle.get('article_title')
        return
    }
    if(path === '/edit'){
        document.title = '写文章'
        return
    }
}
