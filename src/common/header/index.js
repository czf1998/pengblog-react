import React, { PureComponent, Fragment } from 'react'
import {  Router, Route ,Redirect,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CommonHeader from './commonHeader'
import MobileHeader from './mobileHeader'
import ArticleEditPageHeader from './articleEditPageHeader'
import LoginPageHeader from './loginPageHeader'
import IpManagePageHeader from './ipManagePageHeader'
import ManagePageHeader from './managePageHeader'
import RecycleBinPageHeader from './recycleBinPageHeader'
import history from "../../router/history";

class Header extends PureComponent {


    render() {

        const {isMobile,currentPath} = this.props

        return (
                <Router  history={history}>
                    {
                        isMobile ?
                        <MobileHeader/>
                        :
                        <Switch>
                            <Route exact path='/' component={CommonHeader}/>
                            <Route path='/home' component={CommonHeader}/>
                            <Route exact path='/edit' component={ArticleEditPageHeader}/>
                            <Route exact path='/login' component={LoginPageHeader}/>
                            <Route exact path='/ip' component={IpManagePageHeader}/>
                            <Route exact path='/manage' component={ManagePageHeader}/>
                            <Route exact path='/recycle' component={RecycleBinPageHeader}/>
                        </Switch>
                    }
                </Router>
        );
    }

}


const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        currentPath: state.get('router').get('currentPath')
    }
}


export default connect(mapState)(withRouter(Header))