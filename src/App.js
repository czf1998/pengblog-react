import React, { Component } from 'react';
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from './store'
import './commonStyle'
import './exJs'
import { createObserveScrollTopOfElementElAction,createRecordCurrentBrowserEdition } from "./store/actionCreators";
import {PrograssBar,
        Notice,
        Modal,Footer,Startup } from './common'
import history from './router/history'
import {createAppointCurrentPathAction} from "./router/store";

class App extends Component {

    constructor(props){
        super(props)
    }


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

  componentDidMount() {

  }

}



export default App;
