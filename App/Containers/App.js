import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import SplashScreen from 'react-native-splash-screen'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'

const store = createStore()
const persistor = persistStore(store)
class App extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }
  render () {
    return (
      <Provider store={store} loading={null}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    )
  }
}

export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
