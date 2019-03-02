import React, {PureComponent, Fragment} from 'react';
import {  Router, Route ,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history'
import ArticlePageLoadable from '../pages/articlePage/loadable'
import ArticleEditPageLoadable from '../pages/articleEditPage/loadable'
import HomeEXLoadable from '../pages/homeEx/loadable'
import ManagePageLoadable from '../pages/managePage/loadable'
import LoginPageLoadable from '../pages/loginPage/loadable'
import { Header } from '../common'
import {createTriggerAlreadyLoggedInAction} from "../store/actionCreators";

class RouterComponent extends PureComponent {

    render() {

        const {isMobile,alreadyLoggedIn} = this.props

        return (
            <Router history={history}>
                <Fragment>
                    <Header/>

                    {/*<Route exact path='/article/:article_id' component={ArticlePageLoadable}/>*/}
                    <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                    <Route exact={isMobile} path='/home' component={HomeEXLoadable}/>
                    <Route exact path='/article/:article_id' component={ArticlePageLoadable}/>
                    <Route exact path='/manage' component={ManagePageLoadable}/>
                    <Route exact path='/edit' component={ArticleEditPageLoadable}/>
                    <Route exact path='/login' render={() => (alreadyLoggedIn ? <Redirect to='/home'/> : <LoginPageLoadable/>)}/>
                </Fragment>
            </Router>
        );
    }

    componentDidUpdate(){
        appointDocumentTitle(history.location.pathname,this.props.currentArticle)
    }

    componentDidMount(){
        initLoginStatus(this.props.goTo,this.props.getDispatch())
    }
}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile'),
    prograssBarManager: state.get('prograssBar').get('prograssBarManager'),
    currentArticle: state.get('articlePage').get('article'),
    alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn'),
    goTo: state.get('router').get('goTo')
})

const mapActions = (dispatch) => ({
      getDispatch(){
          return dispatch
      }
})

export default connect(mapState,mapActions)(RouterComponent);

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


const initLoginStatus = (goTo,dispatch) => {

    if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
        return
    }

    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
        let tokenObj = JSON.parse(localStorage.getItem('token'))
        let expTime = tokenObj.expTime

        if(expTime < new Date().getTime()){
            return
        }

        const triggerAlreadyLoggedInAction = createTriggerAlreadyLoggedInAction(true)
        dispatch(triggerAlreadyLoggedInAction)
    }
}