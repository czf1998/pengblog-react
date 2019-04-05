import React, { Component } from 'react';
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from './store'
import './commonStyle'
import './exJs'
import {PrograssBar,
        Notice,
        Modal,Footer,Startup } from './common'

class App extends Component {


  render() {

    return (
        <Provider store={store}>

            <Notice/>

            <Modal/>

            <PrograssBar/>

            <RouterComponent/>
            {
                window.innerWidth <= 750 &&
                    <Footer/>
            }

            <Startup/>
        </Provider>
    );
  }


}



export default App;
