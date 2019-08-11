import React, { Component, useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, Button, TextInput } from 'react-native'
import { NextBtn, LightBtn, TouchIdSwitchBtn, AddBtn, FullWidthBtn } from '../Components/Buttons'
import { NormalInput } from '../Components/TextFields'
import { StepUI } from '../Components/UI'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import { AvatarIcon } from '../Components/AvatarIcon'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { transferBalance } from '../Modules/Common'
import { AddToContactsBtn } from '../Components/Buttons'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class AskDone extends Component {
  onPressAddContacts = () => {
    console.log('aaa')
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode', '6539QW')
    navigation.navigate('NewContact', { avatarCode: avatarCode })
  }
  onPress = () => {
    const { navigation } = this.props
    const afterDonePage = navigation.getParam('afterDonePage', 'SwiperHome')
    navigation.navigate(afterDonePage)
  }

  render () {
    const { navigation } = this.props
    const isContact = navigation.getParam('isContact', false)
    const avatarCode = navigation.getParam('avatarCode', '6539QW')
    const nickname = navigation.getParam('nickname', 'Noah')
    const amount = navigation.getParam('amount', '10.1334')
    const note = navigation.getParam('note', 'this is note')
    const type = navigation.getParam('type', '')
    const { firstNum, endNum } = transferBalance(amount)
    return (
      <View style={styles.mainContainer} >
        {type === 'send'
          ? <TopContainer >
            <Image source={Images.icSuccessSend} />
            <Text style={{ color: Colors.btnColor3, ...Fonts.style.h5, marginTop: 16 }}>{I18n.t('sent')}</Text>
          </TopContainer>
          : <TopContainer >
            <Image source={Images.icSuccessAsk} />
            <Text style={{ color: Colors.btnColor2, ...Fonts.style.h5, marginTop: 16 }}>{I18n.t('asked')}</Text>
          </TopContainer>
        }
        <MiddleContainer >
          <Text style={{ color: Colors.gary, ...Fonts.style.h9 }}>{I18n.t('recipient')}</Text>
          {(!isContact)
            ? <RecipientGroup>
              <Text style={{ color: Colors.text, ...Fonts.style.h8, marginTop: 3 }}>{avatarCode}</Text>
              <AddToContactsBtn marginLeft={8} onPress={this.onPressAddContacts} />
            </RecipientGroup>
            : <AvatarIcon avatarCode={avatarCode} name={nickname} style={{ marginTop: 5 }} />
          }

          <Text style={{ color: Colors.gary, ...Fonts.style.h9, marginTop: 28 }}>{I18n.t('amount')}</Text>
          <BalanceView style={{ borderLeftColor: (type === 'send') ? Colors.btnColor3 : Colors.btnColor2 }}>
            <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 3 }}>ツ</Text>
            <Text style={{ ...Fonts.style.h3, color: Colors.text, marginLeft: 5 }}>{firstNum}</Text>
            <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 14 }}>{(endNum === -1) ? null : endNum}</Text>
          </BalanceView>

          <Text style={{ color: Colors.gary, ...Fonts.style.h9, marginTop: 28 }}>{I18n.t('notes')}</Text>
          <Text style={{ color: Colors.text, ...Fonts.style.h8 }}>{note}</Text>

        </MiddleContainer>

        <BottomContainer>
          <FullWidthBtn onPress={this.onPress} >{I18n.t('done')}</FullWidthBtn>
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
const MiddleContainer = styled.View`
  flex: 1
  width: ${Metrics.screenWidth - 48}
  justify-content:flex-start
  align-items: flex-start
`

const BottomContainer = styled.View`
  margin-bottom:24
  width:100%
  align-items:center 
`

const BalanceView = styled.View`
  flex-direction:row
  justify-content: flex-start
  align-items:flex-start
  width: ${Metrics.screenWidth - 48}
  border-left-width:4
  padding-left:8
  marginTop:4
`
const RecipientGroup = styled.View`
  flex-direction:row
`
