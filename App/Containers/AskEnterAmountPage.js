import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { NormalInput } from '../Components/TextFields'
import { Images, Metrics, Colors, Fonts, ApplicationStyles } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { SmallBtn } from '../Components/Buttons'
import AlertWithBtns from '../Components/AlertWithBtns'
import styles from './Styles/LaunchScreenStyles'
import { StepUI } from '../Components/UI'
import { AvatarIcon } from '../Components/AvatarIcon'
import GiggleActions from '../Redux/GiggleRedux'
import WalletStatusActions from '../Redux/WalletStatusRedux'
import { connect } from 'react-redux'
import { TRANSACTION_METHOD } from '../Modules/CommonType'

class AskEnterAmountPage extends Component {
  constructor (props) {
    super(props)
    this.state = { amount: 0, note: '', alertShow: false, alertTitle: '', alertMessage: '', alertBtns: [], alertInput: false }
  }

  renderAmountAccessory = () => {
    if (this.state.amount > 0) {
      return (
        <Image source={Images.icConfirmed} />
      )
    }
  }
  gotoAskDonePage = () => {
    const { navigation, currentWallet, updateWalletStatusRedux, sendTransaction } = this.props
    const { amount, note } = this.state
    if (amount > currentWallet.balance) {
      updateWalletStatusRedux('isEnoughBalance', false)
      return
    }
    const isContact = navigation.getParam('isContact', false)
    const avatarCode = navigation.getParam('avatarCode', '')
    const nickname = navigation.getParam('nickname', '')
    const type = navigation.getParam('type', '')
    const method = navigation.getParam('method', '')
    sendTransaction({ isContact, avatarCode, nickname, type, amount, note, method })
  }
  onPressAskBtn = () => {
    const { navigation, relayAddress } = this.props
    const { amount, note } = this.state
    const avatarCode = navigation.getParam('avatarCode', '')
    const type = navigation.getParam('type', '')
    const tempNote = (note) ? `(${note})` : ''
    const method = navigation.getParam('method', '')
    const message = (method === TRANSACTION_METHOD.AVATAR_CODE) ? (type === 'send') ? `Send ${relayAddress} for \n ツ${amount} ${tempNote}?` : `Ask ${relayAddress} for \n ツ${amount} ${tempNote}?` : (type === 'send') ? `Send ${avatarCode} for \n ツ${amount} ${tempNote}?` : `Ask ${avatarCode} for \n ツ${amount} ${tempNote}?`
    this.setState({
      alertShow: true,
      alertTitle: I18n.t('confirmDetails'),
      alertMessage: message,
      alertBtns: [
        { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
        { text: I18n.t('confirm'), onPress: this.gotoAskDonePage }
      ],
      alertInput: false
    })
  }
  closeAlert = () => {
    this.setState({
      alertShow: false,
      alertTitle: '',
      alertMessage: '',
      alertBtns: [],
      alertInput: false
    })
  }

  render () {
    const { amount, note, alertShow, alertTitle, alertMessage, alertBtns, alertInput } = this.state
    const { navigation } = this.props
    const isContact = navigation.getParam('isContact', false)
    const avatarCode = navigation.getParam('avatarCode', '')
    const nickname = navigation.getParam('nickname', '')
    const type = navigation.getParam('type', '')
    const method = navigation.getParam('method', TRANSACTION_METHOD.AVATAR_CODE)

    const isShowStep = navigation.getParam('isShowStep', true)
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <TextGrout>
            <Text style={{ color: Colors.gary, ...Fonts.style.h9, marginLeft: 10 }}>{I18n.t('recipient')}</Text>
            {(method !== TRANSACTION_METHOD.AVATAR_CODE)
              ? <Text style={{ color: Colors.text, ...Fonts.style.h5, marginLeft: 10 }}>{!nickname ? '' : nickname + '・'}{avatarCode}</Text>
              : <AvatarIcon avatarCode={avatarCode} name={nickname} style={{ marginTop: 10 }} />
            }
          </TextGrout>
          <NormalInput
            labelText={I18n.t('amount')}
            value={amount}
            renderAccessory={this.renderAmountAccessory}
            onChange={(amount) => this.setState({ amount })}
            marginTop={24}
          />
          <NormalInput
            labelText={I18n.t('notesOptional')}
            value={note}
            onChange={(note) => this.setState({ note })}
            maxLength={40}
            marginTop={24}
          />
        </TopContainer>
        <BorderView />

        <StepContainer style={{ justifyContent: (isShowStep) ? 'space-between' : 'flex-end' }} >
          {(!isShowStep) ? null
            : <StepUI totalSteps={2} nowStep={2} color={(type === 'send') ? Colors.btnColor3 : Colors.btnColor2} />
          }
          {(parseFloat(this.state.amount) <= 0)
            ? <SmallBtn
              borderColor={type === 'send' ? 'rgba(240,30,120,0.1)' : 'rgba(60,180,180,0.1)'}
              fontColor='rgba(255,255,255,0.5)'
              activeOpacity={0.6}
              bgColor={type === 'send' ? 'rgba(240,30,120,0.5)' : 'rgba(60,180,180,0.5)'}
            >
              {(type === 'send')
                ? I18n.t('send')
                : I18n.t('ask')
              }
            </SmallBtn>
            : <SmallBtn
              borderColor={type === 'send' ? 'rgba(240,30,120,1)' : 'rgba(60,180,180,1)'}
              fontColor='rgba(255,255,255,1)'
              activeOpacity={0.1}
              bgColor={type === 'send' ? 'rgba(240,30,120,1)' : 'rgba(60,180,180,1)'}
              onPress={this.onPressAskBtn}
            >
              {(type === 'send')
                ? I18n.t('send')
                : I18n.t('ask')
              }
            </SmallBtn>
          }

        </StepContainer>

        <AlertWithBtns isShow={alertShow}
          close={this.closeAlert}
          title={alertTitle}
          message={alertMessage}
          buttons={alertBtns}
          input={alertInput} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentWallet: state.giggle.currentWallet,
    relayAddress: state.walletStatus.relayAddress
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendTransaction: (info) => dispatch(GiggleActions.sendTransaction(info)),
    updateWalletStatusRedux: (key, value) => dispatch(WalletStatusActions.updateWalletStatusRedux(key, value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AskEnterAmountPage)

const TopContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  margin-left:24
  margin-right:24
  flex: 1
`
const BorderView = styled.View`
  width:100%
  border-bottom-width:1
  border-bottom-color: ${Colors.borderColor}
`

const StepContainer = styled.View`
  height:80
  width: ${Metrics.screenWidth - 48}
  flex-direction:row
  justify-content:space-between
  align-items:center
`
const TextGrout = styled.View`
  justify-content:flex-start
  align-items:flex-start
`
