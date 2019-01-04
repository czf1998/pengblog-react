import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-keeper'
import store from './store'
import './commonStyle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import Home from './pages/home'
import ArticlePage from './pages/articlePage'
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
            <BrowserRouter>
                <Fragment>
                    {
                        isMobile ?
                            <HeaderMobile/>
                            :
                            <div className={CommonClassNameConstants.FADE_IN}>
                                <Header/>
                            </div>
                    }
                    <Route path='/'  cache exact component={Home}/>
                    <Route path='/article/:article_id' exact component={ArticlePage}/>
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
