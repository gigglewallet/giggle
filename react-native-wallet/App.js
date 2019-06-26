import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './app/reducers'
import AppNavigation from './app/navigation/AppNavigation'
import RNFetchBlob from 'rn-fetch-blob'
import {NativeModules} from "react-native"

import { type RustState } from 'common/types'

export default class App extends Component {
  configureStore = createStore()

  // Gary+ Just a demo here for Grin Wallet RN APIs
  componentDidMount(): void {

    const result: RustState = {
      account: 'default',
      chain_type: 'floonet',
      data_dir: RNFetchBlob.fs.dirs.DocumentDir + '/wallet_1',
      node_api_addr: 'http://127.0.0.1:13413',
      password: 'my-wallet-password',
      minimum_confirmations: 10,
    }
    const state: String = JSON.stringify(result)

    NativeModules.GrinBridge.walletInit(state, result.password)

    console.debug( 'wallet data directory: ' + result.data_dir )

    const walletMnemonic = NativeModules.GrinBridge.walletPhrase(state)

    console.debug( 'wallet mnemonic phrases: ' + JSON.stringify(walletMnemonic) )
  }
  // Gary-

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
