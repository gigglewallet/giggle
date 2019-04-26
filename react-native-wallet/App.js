import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './app/reducers'
import AppNavigation from './app/navigation/AppNavigation'

export default class App extends Component {
  configureStore = createStore()

  render() {
    return (
      <Provider store={this.configureStore.store}>
        <PersistGate loading={null} persistor={this.configureStore.persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
