import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { LightBtn } from '../Components/Buttons'
import { Images, Fonts, Colors } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/SignUpStyles'

export default class BackUpReminder extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={Images.IcWriteDown} />
          <Text style={{ color: Colors.text, ...Fonts.style.wallerCreate, marginTop: 30 }}>{I18n.t('writeDownYourRecoveryPhrase')}</Text>
          <Text style={{ color: Colors.gary2, ...Fonts.style.h8, marginTop: 24, justifyContent: 'center', marginLeft: 24, marginRight: 24, textAlign: 'center' }}>{I18n.t('writeDownYourRecoveryPhraseInfo')}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <InfoContainer>
            <Image source={Images.IcError} style={{ width: 24, height: 24, marginRight: 16 }} />
            <Text style={{
              color: Colors.waringOrange, ...Fonts.style.h9, width: 287, lineHeight: 20
            }}>{I18n.t('writeDownYourRecoverPhraseNote')}</Text>
          </InfoContainer>
          <LightBtn onPress={() => {
            navigation.navigate('BackUpRecoveryPhrase')
          }}>
            {I18n.t('letsDoIt')}
          </LightBtn>
        </View>
      </View>
    )
  }
}

const InfoContainer = styled.View`
  flex-direction: row
  justify-content:center
  align-items: center
  margin-left: 24
  margin-right: 24
  margin-bottom: 24
  letter-spacing: 0.1
`
