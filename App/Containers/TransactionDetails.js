import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { AvatarIcon } from '../Components/AvatarIcon'
import moment from 'moment'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { transferBalance } from '../Modules/Common'
import { TRANSACTION_METHOD } from '../Modules/CommonType'
const getTitle = (type) => {
  if (type === 4 || type === 5 || type === 6) return 'Received'
  else return 'Send'
}

export default class TransactionDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: getTitle(navigation.getParam('type', 1))
    }
  }
  onPress = () => {
    const { navigation } = this.props
    navigation.navigate('AddContactDone')
  }

  getLeftBorder = () => {
    const { navigation } = this.props
    const type = navigation.getParam('type', 1)
    switch (type) {
      case 1:
      case 2:
      case 3:
        return { borderLeftColor: Colors.btnColor3 }
      case 4:
      case 5:
      case 6:
        return { borderLeftColor: Colors.btnColor2 }
    }
  }

  getStatus = () => {
    const { navigation } = this.props
    const type = navigation.getParam('type', 6)
    switch (type) {
      case 4:
        return (
          <StatusGroup>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{I18n.t('receivePaid')}</Text>
            <ItemIcon source={Images.icReceivePending} />
          </StatusGroup>
        )
      case 5:
        return (
          <StatusGroup>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{I18n.t('receiveConfirmed')}</Text>
            <ItemIcon source={Images.icReceiveConfirmed} />
          </StatusGroup>
        )

      case 6:
        return (
          <StatusGroup>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{I18n.t('receiveFailed')}</Text>
            <ItemIcon source={Images.icReceiveFailed} />
          </StatusGroup>
        )

      case 1:
        return (
          <StatusGroup>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{I18n.t('sendPaid')}</Text>
            <ItemIcon source={Images.icSendPending} />
          </StatusGroup>
        )

      case 2:
        return (
          <StatusGroup>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{I18n.t('sendConfirmed')}</Text>
            <ItemIcon source={Images.icSendConfirmed} />
          </StatusGroup>
        )

      case 3:
        return (
          <StatusGroup>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{I18n.t('receiveFailed')}</Text>
            <ItemIcon source={Images.icSendFailed} />
          </StatusGroup>
        )
    }
  }

  render () {
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode', '')
    const nickname = navigation.getParam('nickname', '')
    const note = navigation.getParam('note', '')
    const date = navigation.getParam('date', 0)
    const amount = navigation.getParam('amount', 0)
    const fee = navigation.getParam('fee', 0)
    const method = navigation.getParam('method', TRANSACTION_METHOD.AVATAR_CODE)
    const { firstNum, endNum } = transferBalance(amount)
    return (
      <View style={styles.mainLeftContainer} >
        <Container>
          <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 24 }} >{I18n.t('amount')}</Text>
          <BalanceView style={this.getLeftBorder()}>
            <Text style={{ ...Fonts.style.h5, color: Colors.text, marginTop: 7 }}>ツ</Text>
            <Text style={{ ...Fonts.style.h0, color: Colors.text, marginLeft: 5 }}>{firstNum}</Text>
            <Text style={{ ...Fonts.style.h5, color: Colors.text, marginTop: 18 }}>{(endNum === -1) ? null : endNum}</Text>
          </BalanceView>

          <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 24 }} >{I18n.t('to')}</Text>
          {method === TRANSACTION_METHOD.AVATAR_CODE
            ? <AvatarIcon avatarCode={avatarCode} name={nickname} style={{ marginTop: 4 }} />
            : <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 4 }} >{avatarCode}</Text>
          }

          <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 24 }} >{I18n.t('fee')}</Text>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 4 }} >{fee}</Text>

          <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 24 }} >{I18n.t('notes')}</Text>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 4 }} >{note}</Text>

          <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 24 }} >{I18n.t('date')}</Text>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 4 }} >{moment(date).format('MMM DD, YYYY h:mm:ss A')}</Text>

          <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 24 }} >{I18n.t('status')}</Text>
          {this.getStatus()}
        </Container>
      </View>

    )
  }
}

const Container = styled.View`
  width: ${Metrics.screenWidth - 48}
  flex: 1
  align-items: flex-start
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

const StatusGroup = styled.View`
  marginTop:4
  flex-direction:row
`
const ItemIcon = styled.Image`
  width:20
  height:20
  marginLeft:8
`
