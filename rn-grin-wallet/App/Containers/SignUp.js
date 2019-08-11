import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { LightBtn, DarkBtn } from '../Components/Buttons'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/SignUpStyles'

export default class SignUp extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={require('../Images/Assets/ic_logo_96px.png')} />
        </View>
        <View style={styles.bottomContainer}>
          <LightBtn onPress={() => {
            navigation.navigate('CreateNewWallet')
          }}>
            {I18n.t('createNewWallet')}
          </LightBtn>
          <DarkBtn onPress={function () { }}>
            {I18n.t('restoreWithRecoveryPhrase')}
          </DarkBtn>
        </View>
      </View>
    )
  }
}
