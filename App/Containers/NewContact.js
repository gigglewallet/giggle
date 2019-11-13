import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { AddBtn, ConfirmBtn } from '../Components/Buttons'
import { NormalInput } from '../Components/TextFields'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import styles from './Styles/LaunchScreenStyles'
import GiggleActions from '../Redux/GiggleRedux'
import { connect } from 'react-redux'
import { TRANSACTION_METHOD } from '../Modules/CommonType'

class NewContact extends Component {
  constructor (props) {
    super(props)
    this.state = { text: 'Useless Placeholder', avatarCode: '', nickname: '', haveData: false }
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this)
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const avatarCodeFromNavigation = navigation.getParam('avatarCode', '')
    if (avatarCodeFromNavigation) {
      this.setState({ avatarCode: avatarCodeFromNavigation })
    }
  }
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }

  renderPasswordAccessory = () => {
    if (this.state.avatarCode.length === 6) {
      return (
        <Image source={Images.icConfirmed} />
      )
    }
  }
  onAvatarCodeChange = (avatarCode) => {
    const { nickname } = this.state
    if (avatarCode.length <= 6) this.setState({ avatarCode })
    else if (avatarCode.length > 6) this.setState({ avatarCode: avatarCode.slice(0, 6) })

    if (avatarCode.length === 6 && nickname){
      this.setState({ haveData: true })
    } else {
      this.setState({ haveData: false })
    }
  }

  onNicknameChange = (nickname) => {
    const { avatarCode } = this.state

    if (avatarCode.length === 6 && nickname){
      this.setState({ haveData: true, nickname: nickname })
    } else {
      this.setState({ haveData: false, nickname: nickname })
    }

  }

  onPress = () => {
    const { navigation, setNewContact } = this.props
    const { avatarCode, nickname } = this.state
    const avatarCodeFromNavigation = navigation.getParam('avatarCode', '')
    const method = navigation.getParam('method', TRANSACTION_METHOD.AVATAR_CODE)

    if (avatarCode.length >= 6 && nickname.length > 0) {
      setNewContact(avatarCode, nickname, method)
    } else {
      return
    }

    if (!avatarCodeFromNavigation) {
      navigation.replace('AddContactDone', { afterDonePage: 'SwiperHome', avatarCode: avatarCode, nickname: nickname })
    } else {
      navigation.replace('AddContactDone', { afterDonePage: 'SwiperHome', avatarCode: avatarCode, nickname: nickname })
    }

    this.setState({ avatarCode: '', nickname: '' })
  }

  render () {
    const { navigation } = this.props
    let { avatarCode, nickname, haveData } = this.state
    const avatarCodeFromNavigation = navigation.getParam('avatarCode', '')
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          {(!avatarCodeFromNavigation)
            ? <NormalInput
              labelText={I18n.t('avatarCode')}
              value={avatarCode}
              renderAccessory={this.renderPasswordAccessory}
              onChange={this.onAvatarCodeChange}
              marginTop={24}
            />
            : <AvatarCodeGroup>
              <Text style={{ color: Colors.darkText, ...Fonts.style.h9, marginLeft: 18 }}>{I18n.t('avatarCode')}</Text>
              <Text style={{ color: Colors.text, ...Fonts.style.h5, marginLeft: 18 }}>{avatarCodeFromNavigation}</Text>
            </AvatarCodeGroup>
          }
          <NormalInput
            labelText={I18n.t('nickname')}
            value={nickname}
            onChange={this.onNicknameChange}
            maxLength={15}
            marginTop={24}
          />
        </TopContainer>
        <BottomContainer>
          <ConfirmBtn disabled={!haveData} onPress={this.onPress}>
              Add
          </ConfirmBtn>
        </BottomContainer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewContact: (avatarCode, nickname, method) => dispatch(GiggleActions.setNewContact(avatarCode, nickname, method))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewContact)

const TopContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  margin-left:24
  margin-right:24
  flex: 1
`

const BottomContainer = styled.View`
  height: 50
  width:100%
  align-items: flex-end
  padding-right:16
`
const AvatarCodeGroup = styled.View`
  width: ${Metrics.screenWidth - 48}
  justify-content:flex-start
`
