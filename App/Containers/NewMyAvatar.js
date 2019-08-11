import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { AddBtn } from '../Components/Buttons'
import { NormalInput } from '../Components/TextFields'
import { Images, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class NewMyAvatar extends Component {
  constructor (props) {
    super(props)
    this.state = { text: 'Useless Placeholder', avatarCode: '', nickname: '' }
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this)
  }

  renderPasswordAccessory () {
    if (this.state.avatarCode.length === 6) {
      return (
        <Image source={Images.icConfirmed} />
      )
    }
  }
  onAvatarCodeChange = (avatarCode) => {
    if (avatarCode.length <= 6) this.setState({ avatarCode })
    else if (avatarCode.length > 6) this.setState({ avatarCode: avatarCode.slice(0, 6) })
  }

  onPress = () => {
    const { navigation } = this.props
    navigation.navigate('AddContactDone', { afterDonePage: 'MyAvatars' })
  }

  render () {
    let { avatarCode, nickname } = this.state
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <NormalInput
            labelText={I18n.t('avatarCode')}
            value={avatarCode}
            renderAccessory={this.renderPasswordAccessory}
            onChange={this.onAvatarCodeChange}
            marginTop={24}
          />
          <NormalInput
            labelText={I18n.t('nickname')}
            value={nickname}
            onChange={(nickname) => this.setState({ nickname })}
            maxLength={15}
            marginTop={24}
          />
        </TopContainer>
        <BottomContainer>
          <AddBtn onPress={this.onPress} />
        </BottomContainer>
      </View>

    )
  }
}

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
