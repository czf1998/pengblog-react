import React, { Component } from 'react';
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from './store'
import './commonStyle'
import './exJs'
import { createObserveScrollTopOfElementElAction,createRecordCurrentBrowserEdition } from "./store/actionCreators";
import { CommonClassNameConstants } from './commonStyle'
import {Footer,
        PrograssBar,
        Notice,
        Modal } from './common'
import history from './router/history'
import {createAppointCurrentPathAction} from "./router/store";

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

    return (
        <Provider store={store}>

            <Notice/>

            <Modal/>

            {/*<PrograssBar/>*/}

            <RouterComponent/>

            {/*<div className={CommonClassNameConstants.FADE_IN}>
                <Footer/>
            </div>*/}

        </Provider>
    );
  }

  componentDidMount() {
      store.dispatch(createObserveScrollTopOfElementElAction())
      store.dispatch(createAppointCurrentPathAction(history.location.pathname))
      store.dispatch(createRecordCurrentBrowserEdition())
      //store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
  }

}



export default App;
