import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './commonStyle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/home'

import Header from './common/header'
import Footer from './common/footer'


class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <Header/>
                <BrowserRouter>
                    <Fragment>
                        <Route path='/' exact component={Home}/>
                        <Route path='/article' exact render={() => <div>article</div>}/>
                    </Fragment>
                </BrowserRouter>
            <Footer/>
        </Provider>
    );
  }

  componentDidMount() {
      this.initRecordDocumentScrollTop()
      store.dispatch(createObserveScrollTopOfElementElAction())
  }

  initRecordDocumentScrollTop() {
      window.addEventListener('scroll', () => {
          store.dispatch(createObserveScrollTopOfElementElAction())
      })
  }

}



export default App;
