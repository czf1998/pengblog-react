import React, {PureComponent, Fragment} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeLoadable from '../pages/home/loadable'
import ArticlePageLoadable from '../pages/articlePage/loadable'
import { CommonClassNameConstants } from '../commonStyle'
import { Header, Footer, HeaderMobile, PrograssBar } from '../common'
import Test from '../pages/test'

class Router extends PureComponent {

    constructor(props){
        super(props)
    }


    render() {

        const { isMobile } = this.props
        return (
                <BrowserRouter>
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
                </BrowserRouter>
        );
    }


}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile')
})

export default connect()(Router);
