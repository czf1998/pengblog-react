import React, { Component } from 'react';
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from './store'
import './commonStyle'
import './exJs'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import { CommonClassNameConstants } from './commonStyle'
import { Footer, PrograssBar } from './common'

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

            <PrograssBar/>

            <RouterComponent/>

            <div className={CommonClassNameConstants.FADE_IN}>
                <Footer/>
            </div>

        </Provider>
    );
  }

  componentDidMount() {
      store.dispatch(createObserveScrollTopOfElementElAction())
      store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
  }

}



export default App;
