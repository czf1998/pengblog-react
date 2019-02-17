import React, {PureComponent, Fragment} from 'react';
import {  Router, Route ,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history'
import HomeLoadable from '../pages/home/loadable'
import ArticlePageLoadable from '../pages/articlePage/loadable'
import ArticleEditPageLoadable from '../pages/articleEditPage/loadable'
import HomeEX from '../pages/homeEx'
import { Header } from '../common'
import Test from '../pages/test'

class RouterComponent extends PureComponent {



    render() {

        return (
            <Router history={history}>
                <Fragment>
                    <Header/>
                    {/*<Route exact path='/article/:article_id' component={ArticlePageLoadable}/>*/}
                    <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                    <Route exact path='/edit' component={ArticleEditPageLoadable}/>
                    <Route path='/home' component={HomeEX}/>
                    <Route exact path='/test' component={Test}/>

                </Fragment>
            </Router>
        );
    }


}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile'),
    prograssBarManager: state.get('prograssBar').get('prograssBarManager')
})

export default connect(mapState,null)(RouterComponent);
