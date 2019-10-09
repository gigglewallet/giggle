import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { FullWidthBtn } from '../Components/Buttons'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import { AvatarIcon } from '../Components/AvatarIcon'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from './Styles/LaunchScreenStyles'

export default class AddContactDone extends Component {
  constructor (props) {
    super(props)
    this.state = { avatarCode: '', nickname: '' }
  }

  componentWillMount = () => {
    const { navigation } = this.props
    const avatarCode = navigation.getParam('avatarCode', '')
    const nickname = navigation.getParam('nickname', '')
    this.setState({ avatarCode: avatarCode, nickname: nickname })
  }

  onPress = () => {
    const { navigation } = this.props
    const afterDonePage = navigation.getParam('afterDonePage', 'SwiperHome')
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: afterDonePage })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    const { avatarCode, nickname } = this.state
    return (
      <View style={styles.mainContainer} >
        <TopContainer >
          <Image source={Images.icSuccessPrimary} />
          <Text style={{ color: Colors.darkText, ...Fonts.style.h5, marginTop: 16 }}>{I18n.t('added')}</Text>
        </TopContainer>
        <BottomContainer>
          <AvatarIcon avatarCode={avatarCode} name={nickname} style={{ marginBottom: 24 }} />
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
