import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux'
//import { BrowserRouter, Route } from 'react-keeper'
import Router from './router'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import './commonStyle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import HomeLoadable from './pages/home/loadable'
import ArticlePageLoadable from './pages/articlePage/loadable'
import { CommonClassNameConstants } from './commonStyle'
import { Header, Footer, HeaderMobile, PrograssBar } from './common'
import Test from './pages/test'

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

            <PrograssBar/>

            <Router/>

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
