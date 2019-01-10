import React, {PureComponent, Fragment} from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom'
//import PreNavGuardRoute from './hocRoute/preNavGuardRoute'
import { connect } from 'react-redux'
import history from './history'
import HomeLoadable from '../pages/home/loadable'
import ArticlePageLoadable from '../pages/articlePage/loadable'
import { CommonClassNameConstants } from '../commonStyle'
import { Header, Footer, HeaderMobile, PrograssBar } from '../common'
import Test from '../pages/test'

class RouterComponent extends PureComponent {

    constructor(props){
        super(props)
    }


    render() {

        const { isMobile, prograssBarManager } = this.props
        return (
                <Router history={history}>
                    <Fragment>
                        {
                            isMobile ?
                                <HeaderMobile/>
                                :
                                <Header/>
                        }
                        <Route exact path='/article/:article_id' component={ArticlePageLoadable}/>
                        <Route path='/'  exact component={HomeLoadable}/>
                        <Route path='/test' exact component={Test}/>
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
