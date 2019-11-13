import React, { Component } from 'react'
import {
  View
} from 'react-native'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { Loading, EasyLoading } from 'react-native-easy-loading'

export default class LaunchScreen extends Component {
  componentDidMount = () => {
    EasyLoading.show('Loading...', -1)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Loading type={'type'} />
      </View>
    )
  }
}
