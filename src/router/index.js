import React, {PureComponent, Fragment} from 'react';
import {  Router, Route ,Redirect,Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history'
import ArticlePageEXLoadable from '../pages/articlePageEX/loadable'
import ArticlePageLoadable from '../pages/articlePage/loadable'
import ArticleEditPageLoadable from '../pages/articleEditPage/loadable'
import HomeEXLoadable from '../pages/homeEx/loadable'
import ManagePageLoadable from '../pages/managePage/loadable'
import LoginPageLoadable from '../pages/loginPage/loadable'
import NoFoundPageLoadable from '../pages/noFoundPage/loadable'
import ServerUnavailablePageLoadable from '../pages/serverUnavailablePage/loadable'
import IpManagePageLoadable from "../pages/ipManagePage/loadable";
import RecycleBinPageLoadable from '../pages/recycleBinPage/loadable'
import { Header } from '../common'
import {createTriggerAlreadyLoggedInAction} from "../store/actionCreators";
import {createAppointLoginPageInputValueAction} from "../pages/loginPage/store";

class RouterComponent extends PureComponent {

    render() {

        const {isMobile} = this.props

        let alreadyLoggedIn = getLoginStatus()

        return (
            <Router history={history}>
                <Fragment>
                    <Header/>
                    <Switch>
                        <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                        <Route exact={isMobile} path='/home' component={HomeEXLoadable}/>
                        <Route exact path='/article/:article_id' render={() => (isMobile ? (<ArticlePageLoadable/>) : (<ArticlePageEXLoadable/>))}/>
                        <Route exact path='/manage' component={ManagePageLoadable}/>
                        <Route exact path='/ip' render={() => (alreadyLoggedIn ? (<IpManagePageLoadable/>) : (<Redirect to='/login'/>))}/>
                        <Route exact path='/edit' render={() => (alreadyLoggedIn ? (<ArticleEditPageLoadable/>) : (<Redirect to='/login'/>))}/>
                        <Route exact path='/recycle' render={() => (alreadyLoggedIn ? (<RecycleBinPageLoadable/>) : (<Redirect to='/login'/>))}/>
                        <Route path='/login' render={() => (alreadyLoggedIn ? (<Redirect to='/home'/>) : (<LoginPageLoadable/>))}/>
                        <Route exact path='/logout' render={() => (alreadyLoggedIn ? (<LoginPageLoadable/>) : (<Redirect to='/home'/>))}/>
                        <Route exact path='/404' component={NoFoundPageLoadable}/>
                        <Route exact path='/503' component={ServerUnavailablePageLoadable}/>
                        {
                            isMobile && <Route path="/home/article/:article_id" component={ArticlePageLoadable}/>
                        }
                        <Route component={NoFoundPageLoadable}/>
                    </Switch>
                </Fragment>
            </Router>
        );
    }

    componentDidUpdate(){
        appointDocumentTitle(history.location.pathname,this.props.currentArticle)
    }

    componentWillMount(){
       initLoginStatus(this.props.getDispatch())
    }
}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile'),
    prograssBarManager: state.get('prograssBar').get('prograssBarManager'),
    currentArticle: state.get('articlePage').get('article'),
    alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn'),
})

const mapActions = (dispatch) => ({
      getDispatch(){
          return dispatch
      }
})

export default connect(mapState,mapActions)(RouterComponent);

const appointDocumentTitle = (path,currentArticle) => {
    if(path === '/home'){
        document.title = '远方有鱼'
        return
    }
    if(path === '/manage'){
        document.title = '远方有鱼-索引'
        return
    }
    if(path.match(/^\/home\/article/) !== null){
        document.title = currentArticle.get('article_title') ? currentArticle.get('article_title') : '载入中...'
        return
    }
    if(path.match(/^\/article/) !== null){
        document.title = currentArticle.get('article_title') ? currentArticle.get('article_title') : '载入中...'
        return
    }
    if(path === '/edit'){
        document.title = '写文章'
    }
    if(path === '/404'){
        document.title = '404'
    }
    if(path === '/503'){
        document.title = '503'
    }
    if(path === '/ip'){
        document.title = '封禁IP'
    }
}

const getLoginStatus = () => {

    if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
        return false
    }

    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
        let tokenObj = JSON.parse(localStorage.getItem('token'))
        let expTime = tokenObj.expTime

        if(expTime < new Date().getTime()){
            return false
        }

        return true
    }
}

const initLoginStatus = (dispatch) => {

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


        //更新loginPage.reducer的username
        const appointLoginPageInputValueActionValue = {
            inputId: 'username',
            inputValue: tokenObj.username
        }
        const appointLoginPageInputValueAction = createAppointLoginPageInputValueAction(appointLoginPageInputValueActionValue)
        dispatch(appointLoginPageInputValueAction)
    }
}