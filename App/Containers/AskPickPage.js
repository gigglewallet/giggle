import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import styles from './Styles/LaunchScreenStyles'
import { SearchInput, NormalInput } from '../Components/TextFields'
import { RenderContactsItemNoBtn, StepUI } from '../Components/UI'
import { SmallBtn } from '../Components/Buttons'
import I18n from 'react-native-i18n'
import GiggleActions from '../Redux/GiggleRedux'
import { connect } from 'react-redux'
import { TRANSACTION_METHOD } from '../Modules/CommonType'

class AskPickPage extends Component {
  state = {
    keyword: '',
    avatarCode: ''
  }
  gotoEnterAmountPage = async (item) => {
    const { navigation, relayAddressQuery } = this.props
    const type = navigation.getParam('type', '')
    if (item.method === TRANSACTION_METHOD.AVATAR_CODE) {
      relayAddressQuery(item.avatarCode.toLowerCase(), (relayAddress) => {
        navigation.push('AskEnterAmountPage', {
          avatarCode: item.avatarCode,
          nickname: item.nickname,
          isContact: true,
          type,
          relayAddress: relayAddress,
          method: item.method
        })
      })
    } else {
      navigation.push('AskEnterAmountPage', { avatarCode: item.avatarCode, nickname: item.nickname, isContact: true, type, method: item.method })
    }
  }
  getSource (datas) {
    if (this.state.keyword.length === 0) return datas
    return datas.filter((item, index) => {
      return (item.avatarCode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || item.nickname.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1)
    })
  }
  onAvatarCodeChange = (avatarCode) => {
    this.setState({ avatarCode })
  }
  renderPasswordAccessory = () => {
    if (this.verifyAddress(this.state.avatarCode).result) {
      return (
        <Image source={Images.icConfirmed} />
      )
    }
  }
  verifyAddress = (s) => {
    if (this.state.avatarCode.length > 6 && (this.state.avatarCode.indexOf('https') > -1 || this.state.avatarCode.indexOf('http') > -1)) return { method: TRANSACTION_METHOD.HTTPS, result: true }
    if (this.state.avatarCode.length > 6 && (this.state.avatarCode.indexOf('tn1-') > -1 || this.state.avatarCode.indexOf('gn1-') > -1)) return { method: TRANSACTION_METHOD.RELAY_ADDRESS, result: true }
    if (this.state.avatarCode.length >= 6) return { method: TRANSACTION_METHOD.AVATAR_CODE, result: true }
    return { result: false }
    // https://hk.grin.icu:13415
    // tn1-q05y5n9x-67cec43ngu3ppfa-448sj75u36przms-zw6elmauj7q4dl7-xsfvx9
    // Avatar Code:  xsfvx9
  }
  onPressNext = () => {
    const { relayAddressQuery, navigation } = this.props
    const { avatarCode } = this.state
    const result = this.verifyAddress(this.state.avatarCode)
    const type = navigation.getParam('type', '')
    if (result.method === TRANSACTION_METHOD.AVATAR_CODE) {
      relayAddressQuery(avatarCode.toLowerCase(), (relayAddress) => {
        const { navigation } = this.props
        navigation.navigate('AskEnterAmountPage', {
          avatarCode: avatarCode,
          nickname: '',
          isContact: false,
          type,
          relayAddress: relayAddress,
          method: result.method
        })
      })
      return
    }
    navigation.navigate('AskEnterAmountPage', { avatarCode: avatarCode, isContact: false, type, method: result.method })
  }
  render () {
    const { navigation, contacts } = this.props
    const { avatarCode, keyword } = this.state
    const type = navigation.getParam('type', '')
    return (
      <View style={styles.mainContainer}>
        <TopContainer>
          <NormalInput
            labelText={I18n.t('avatarCodeOrOther')}
            value={avatarCode}
            renderAccessory={this.renderPasswordAccessory}
            onChange={this.onAvatarCodeChange}
          />
          <Text style={{ color: Colors.gary, ...Fonts.style.h8, marginTop: 40 }}>{I18n.t('orChooseFromContacts')}</Text>
        </TopContainer>
        <MiddleContainer>
          <SearchInput
            placeholder={I18n.t('searchContacts')}
            width={keyword.length === 0 ? null : 256}
            onChange={
              (keyword) => this.setState({ keyword })} value={keyword} />
          {keyword.length === 0
            ? null
            : <Text style={{ ...Fonts.style.h8, color: Colors.darkText, marginLeft: 24 }} onPress={() => { this.setState({ keyword: '' }) }}>{I18n.t('cancel')} </Text>
          }
        </MiddleContainer>
        <BottomContainer>
          <ListView>
            <FlatList
              data={this.getSource(contacts)}
              renderItem={({ item }) => <RenderContactsItemNoBtn item={item} onPress={this.gotoEnterAmountPage.bind(this, item)} />}
            />
          </ListView>
        </BottomContainer>
        <StepContainer >
          <StepUI totalSteps={2} nowStep={1} color={(type === 'send') ? Colors.btnColor3 : Colors.btnColor2} />
          {(!this.verifyAddress(this.state.avatarCode).result)
            ? <SmallBtn
              borderColor={type === 'send' ? 'rgba(240,30,120,0.5)' : 'rgba(60,180,180,0.5)'}
              fontColor={type === 'send' ? 'rgba(240,30,120,0.5)' : 'rgba(60,180,180,0.5)'}
              activeOpacity={0.6}
            >
              {I18n.t('next')}
            </SmallBtn>
            : <SmallBtn
              borderColor={type === 'send' ? 'rgba(240,30,120,1)' : 'rgba(60,180,180,1)'}
              fontColor={type === 'send' ? 'rgba(240,30,120,1)' : 'rgba(60,180,180,1)'}
              activeOpacity={0.1}
              onPress={this.onPressNext}
            >
              {I18n.t('next')}
            </SmallBtn>
          }
        </StepContainer>

      </View>
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
    relayAddressQuery: (targetAvatarCode, callback) => dispatch(GiggleActions.relayAddressQuery(targetAvatarCode, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskPickPage)
const TopContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  margin-left:24
  margin-right:24
  height:104
`

const MiddleContainer = styled.View`
  margin-top:24
  width: ${Metrics.screenWidth - 48}
  height:48
  flex-direction:row
  justify-content:flex-start
  align-items: center
`
const BottomContainer = styled.View`
  flex:1
  width: ${Metrics.screenWidth - 48}
  justify-content: flex-start
`
const ListView = styled.View`
  flex:1
  width: ${Metrics.screenWidth - 48}
`
const StepContainer = styled.View`
  height:80
  width: ${Metrics.screenWidth - 48}
  flex-direction:row
  justify-content:space-between
  align-items:center
`
