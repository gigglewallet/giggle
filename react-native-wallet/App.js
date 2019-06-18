import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './app/reducers'
import AppNavigation from './app/navigation/AppNavigation'
import RNFetchBlob from 'rn-fetch-blob'
import {NativeModules} from "react-native"

export default class App extends Component {
  configureStore = createStore()

  componentDidMount(): void {
    let dirs = RNFetchBlob.fs.dirs
    console.warn(dirs);
    var grinBridge = NativeModules.GrinBridge.init(false, {dirs} + '/wallet/', 'my-password')
    // grinBridge.walletRecovery('survey write again earth song palace wreck adjust genre upper arctic episode wonder resource actress eye aspect few element fiscal announce note sword early')
  }

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
