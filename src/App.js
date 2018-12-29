import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import './commonStyle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";

import Home from './pages/home'

import Header from './common/header'
import Footer from './common/footer'


class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <Header></Header>
            <Home></Home>
            <Footer></Footer>
        </Provider>
    );
  }

  componentDidMount() {
      this.initRecordDocumentScrollTop()
  }

  initRecordDocumentScrollTop() {
      window.addEventListener('scroll', () => {
          let scrollTopOfDocumentEl = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
          store.dispatch(createObserveScrollTopOfElementElAction(scrollTopOfDocumentEl))
      })
  }
}



export default App;
