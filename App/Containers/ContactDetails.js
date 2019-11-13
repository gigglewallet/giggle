import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { Images, Colors, Fonts, Metrics, ApplicationStyles } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { ContactDetailsHeader } from '../Components/Header'
import Blockies from 'react-native-blockies'
import { AskBtn, SendBtn } from '../Components/Buttons'
import AlertWithBtns from '../Components/AlertWithBtns'
import GiggleActions from '../Redux/GiggleRedux'
import { connect } from 'react-redux'
import WalletStatusActions from '../Redux/WalletStatusRedux'
import { TRANSACTION_METHOD } from '../Modules/CommonType'
class ContactDetails extends Component {
  state = { alertShow: false, alertTitle: '', alertMessage: '', alertBtns: [], alertInput: false }
  private = {
    timeoutId: 0
    // tempAvatarCode: null,
    // temiNickname: null,
    // tempIsContact: false
  }
  /*
  componentWillReceiveProps (nextProps) {
    if (nextProps.relayAddress && !this.props.relayAddress) {
      const { navigation } = this.props
      navigation.navigate('AskEnterAmountPage', { type: 'send', isContact: true, avatarCode: this.private.tempAvatarCode, nickname: this.private.tempNickname, isShowStep: false })
    }
  }
  */
  closeAlert = () => {
    this.setState({
      alertShow: false,
      alertTitle: '',
      alertMessage: '',
      alertBtns: [],
      alertInput: false
    })
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const nickname = navigation.getParam('nickname')
    this.setState({ nickname: nickname })
  }
  deleteContact = () => {
    const { delContact, navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode')

    delContact(avatarCode)
    navigation.navigate('SwiperHome')
  }
  updateNickname = (n) => {
    const { updateContact, navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode')
    
    if (!n) return
    this.setState({ nickname: n })
    updateContact(avatarCode, n)
  }
  editeNickname = () => {
    this.setState({
      alertShow: true,
      alertTitle: I18n.t('editNickname'),
      alertMessage: '',
      alertBtns: [
        { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
        { text: I18n.t('ok'), onPress: (n) => this.updateNickname(n) }
      ],
      alertInput: true
    })
  }
  onPressRightBtn = () => {
    const { navigation } = this.props
    this.setState({
      alertShow: true,
      alertTitle: I18n.t('deleteThisContact'),
      alertMessage: I18n.t('youCanAddItBackAtAnyTime'),
      alertBtns: [
        { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
        { text: I18n.t('delete'), style: { color: 'red' }, onPress: this.deleteContact }
      ],
      alertInput: false
    })
  }
  onPressLeftBtn = () => {
    const { navigation } = this.props
    navigation.goBack()
  }
  onAskPress = () => {
    if (this.private.timeoutId === 0) {
      const { updateWalletStatusRedux } = this.props
      updateWalletStatusRedux('isPressedAskBtn', true)
      this.private.timeoutId = setTimeout(() => {
        this.private.timeoutId = 0
        updateWalletStatusRedux('isPressedAskBtn', false)
      }, 2500)
    }
  }
  onSendPRess = () => {
    const { navigation } = this.props
    const { relayAddressQuery } = this.props
    const tempAvatarCode = navigation.getParam('avatarCode')
    const tempNickname = navigation.getParam('nickname')
    const method = navigation.getParam('method', TRANSACTION_METHOD.AVATAR_CODE)
    if (method === TRANSACTION_METHOD.AVATAR_CODE) {
      relayAddressQuery(tempAvatarCode.toLowerCase(), (relayAddress) => {
        const { navigation } = this.props
        navigation.navigate('AskEnterAmountPage', {
          type: 'send',
          isContact: true,
          avatarCode: tempAvatarCode,
          nickname: tempNickname,
          isShowStep: false,
          method: method,
          relayAddress
        })
      })
      return
    }

    navigation.navigate('AskEnterAmountPage', {
      avatarCode: tempAvatarCode,
      isContact: true,
      isShowStep: false,
      type: 'send',
      method: method,
      nickname: tempNickname
    })

  }
  render () {
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode')
    const { alertShow, alertTitle, alertMessage, alertBtns, alertInput, nickname } = this.state
    return (
      <View style={styles.mainContainer} >
        <ContactDetailsHeader onPressLeftBtn={this.onPressLeftBtn} onPressRightBtn={this.onPressRightBtn} />
        <TopContainer >
          <Blockies
            blockies={avatarCode} // string content to generate icon
            size={80} // blocky icon size
            style={{ width: 80, height: 80 }} // style of the view will wrap the icon
          />
          <NicknameView>
            <Text style={{ color: Colors.text, ...Fonts.style.h4_2 }}>{nickname}</Text>
            <EditNickname onPress={this.editeNickname} />
          </NicknameView>
          <Text style={{ color: Colors.gary, ...Fonts.style.h5, marginTop: 8 }}>{avatarCode}</Text>
        </TopContainer>
        <BottomContainer>
          <AskBtn onPress={this.onAskPress} />
          <SendBtn onPress={this.onSendPRess} />
        </BottomContainer>
        <AlertWithBtns isShow={alertShow}
          close={this.closeAlert}
          title={alertTitle}
          message={alertMessage}
          buttons={alertBtns}
          input={alertInput} />
      </View >

    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.giggle.contacts,
    relayAddress: state.walletStatus.relayAddress,
    isFailRelayAddressQuery: state.walletStatus.isFailRelayAddressQuery
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delContact: (avatarCode) => dispatch(GiggleActions.delContact(avatarCode)),
    updateContact: (avatarCode, nickname) => dispatch(GiggleActions.updateContact(avatarCode, nickname)),
    relayAddressQuery: (targetAvatarCode, callback) => dispatch(GiggleActions.relayAddressQuery(targetAvatarCode, callback)),
    updateWalletStatusRedux: (key, value) => dispatch(WalletStatusActions.updateWalletStatusRedux(key, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)

const TopContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  justify-content:center
  align-items:center
  flex: 1
`

const BottomContainer = styled.View`
  margin-bottom:48
  width:100%
  flex-direction:row
  align-items:center 
  justify-content:center
`
const NicknameView = styled.View`
  marginTop: 24 
  flex-direction:row
  width:100%
  align-items:center 
  justify-content:center
`
const EditNicknameView = styled.TouchableOpacity`
    
`

const EditNickname = ({ onPress }) => {
  return (
    <EditNicknameView onPress={onPress}>
      <Image source={Images.icEdit} style={{ marginLeft: 8 }} />
    </EditNicknameView>
  )
}
