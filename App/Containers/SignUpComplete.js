import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { LightBtn } from '../Components/Buttons'
import { Images, Fonts, Colors } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/SignUpStyles'

export default class SignUpComplete extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={Images.icSuccessPrimary} />
          <Text style={{ color: Colors.btnColor1, ...Fonts.style.wallerCreate }}>{I18n.t('walletCreated')}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <InfoContainer>
            <Image source={Images.signInChecked} style={{ width: 20, height: 20, marginRight: 8 }} />
            <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>{I18n.t('walletPasswordSet')}</Text>
          </InfoContainer>
          <InfoContainer style={{ marginBottom: 40 }}>
            <Image source={Images.signInChecked} style={{ width: 20, height: 20, marginRight: 8 }} />
            <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>{I18n.t('spendingPinSet')}</Text>
          </InfoContainer>
          <LightBtn onPress={() => {
            navigation.navigate('SwiperHome')
          }}>
            {I18n.t('getStarted')}
          </LightBtn>

        </View>
      </View>
    )
  }
}

const InfoContainer = styled.View`
  flex-direction: row
  align-items: center
  margin-top:24
`
