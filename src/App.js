import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './commonStyle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import { BrowserRouter, Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Home from './pages/home'
import { CommonClassNameConstants } from './commonStyle'

import { Header, Footer, HeaderMobile } from './common'


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isMobile: false
        }
        store.subscribe(() => {
            this.setState({
                isMobile: store.getState().get('rootState').get('isMobile')
            })
        })
    }


  render() {
    const { isMobile } = this.state

    return (
        <Provider store={store}>
            {
                isMobile ?
                    <HeaderMobile/>
                :
                    <div className={CommonClassNameConstants.SLIDE_DOWN}>
                        <Header/>
                    </div>
            }

            <BrowserRouter>
                <Fragment>
                    <Route path='/' exact component={Home}/>
                    <Route path='/article' exact render={() => <div>article</div>}/>
                </Fragment>
            </BrowserRouter>

            <div className={CommonClassNameConstants.FADE_IN}>
                <Footer/>
            </div>




        </Provider>
    );
  }

  componentDidMount() {
      //this.initRecordDocumentScrollTop()
      store.dispatch(createObserveScrollTopOfElementElAction())
  }

  initRecordDocumentScrollTop() {
      window.addEventListener('scroll', () => {
          store.dispatch(createObserveScrollTopOfElementElAction())
      })
  }

}



export default App;
