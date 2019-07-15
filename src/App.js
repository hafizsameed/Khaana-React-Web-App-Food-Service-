import React, { Component } from 'react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './components/router'
class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    console.log("render app", this.props.history)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <React.Fragment>
          <Navigation />
        </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
