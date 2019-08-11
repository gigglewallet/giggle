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
export default class ContactDetails extends Component {
  state = { alertShow: false, alertTitle: '', alertMessage: '', alertBtns: [], alertInput: false }
  closeAlert = () => {
    this.setState({
      alertShow: false,
      alertTitle: '',
      alertMessage: '',
      alertBtns: [],
      alertInput: false
    })
  }
  deleteContact = () => {

  }
  updateNickname = (n) => {
    console.log(n)
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
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode')
    const nickname = navigation.getParam('nickname')
    navigation.navigate('AskEnterAmountPage', { type: 'ask', isContact: true, avatarCode: avatarCode, nickname: nickname, isShowStep: false })
  }
  onSendPRess = () => {
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode')
    const nickname = navigation.getParam('nickname')
    navigation.navigate('AskEnterAmountPage', { type: 'send', isContact: true, avatarCode: avatarCode, nickname: nickname, isShowStep: false })
  }
  render () {
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode')
    const nickname = navigation.getParam('nickname')
    const { alertShow, alertTitle, alertMessage, alertBtns, alertInput } = this.state
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
