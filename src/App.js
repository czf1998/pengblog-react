import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import './commonStyle'

import Home from './pages/home'

import Header from './common/header'

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Header></Header>
            <Home></Home>
        </Provider>
    );
  }
}

export default App;
