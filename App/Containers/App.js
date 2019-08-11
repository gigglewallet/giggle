import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import SplashScreen from 'react-native-splash-screen'

const store = createStore()

class App extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
