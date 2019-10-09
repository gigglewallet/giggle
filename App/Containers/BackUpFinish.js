import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { LightBtn } from '../Components/Buttons'
import { Images, Fonts, Colors } from '../Themes'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/SignUpStyles'

export default class BackUpFinish extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.topContainer}>
          <Image style={{}} source={Images.IcBackedUp} />
          <Text style={{ color: Colors.text, ...Fonts.style.wallerCreate, marginTop: 48, marginBottom: 24 }}>{I18n.t('recoveryPhraseBackedUp')}</Text>
          <Text style={{ color: Colors.gary2, ...Fonts.style.h8, marginTop: 24, justifyContent: 'center', marginLeft: 24, marginRight: 24, textAlign: 'center' }}>{I18n.t('beSureToStoreYourRecoveryPhrase')}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <LightBtn onPress={() => {
            navigation.navigate('SwiperHome')
          }}>
            {I18n.t('backToHome')}
          </LightBtn>
        </View>
      </View>
    )
  }
}
