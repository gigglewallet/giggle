import React, { Component, useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, Button, TextInput } from 'react-native'
import { NextBtn, LightBtn, TouchIdSwitchBtn, AddBtn, FullWidthBtn } from '../Components/Buttons'
import { NormalInput } from '../Components/TextFields'
import { StepUI } from '../Components/UI'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import { AvatarIcon } from '../Components/AvatarIcon'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class AddContactDone extends Component {
  onPress = () => {
    const { navigation } = this.props
    const afterDonePage = navigation.getParam('afterDonePage', 'Contacts')
    navigation.push(afterDonePage, { isContact: true })
  }

  render () {
    return (
      <View style={styles.mainContainer} >
        <TopContainer >
          <Image source={Images.icSuccessPrimary} />
          <Text style={{ color: Colors.darkText, ...Fonts.style.h5, marginTop: 16 }}>{I18n.t('added')}</Text>
        </TopContainer>
        <BottomContainer>
          <AvatarIcon avatarCode={'6539QW'} name={'Noah'} style={{ marginBottom: 24 }} />
          <Text style={{ color: Colors.text, ...Fonts.style.h8, marginBottom: 48 }}>{I18n.t('isNowYourContact')}</Text>
          <FullWidthBtn onPress={this.onPress} > {I18n.t('done')}</FullWidthBtn>
        </BottomContainer>

      </View >

    )
  }
}

const TopContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  justify-content:center
  align-items:center
  flex: 1
`

const BottomContainer = styled.View`
  margin-bottom:24
  width:100%
  align-items:center 
`
