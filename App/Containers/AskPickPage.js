import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { ContactsHeader } from '../Components/Header'
import { SearchInput, NormalInput } from '../Components/TextFields'
import { RenderContactsItemNoBtn, StepUI } from '../Components/UI'
import { SmallBtn } from '../Components/Buttons'
import I18n from 'react-native-i18n'
import { runSaga } from 'redux-saga'
import { rgba } from 'polished'
import GiggleActions from '../Redux/GiggleRedux'
import { connect } from 'react-redux'
import AlertWithBtns from '../Components/AlertWithBtns'

class AskPickPage extends Component {
  state = {
    keyword: '',
    avatarCode: '',
    alertShow: false,
    alertTitle: '',
    alertMessage: '',
    alertBtns: [],
    alertInput: false
  }
  private = {
    tempAvatarCode: null,
    temiNickname: null,
    tempIsContact: false
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.relayAddress && !this.props.relayAddress) {
      const { navigation } = this.props
      const type = navigation.getParam('type', '')
      navigation.navigate('AskEnterAmountPage', { avatarCode: this.private.tempAvatarCode, nickname: this.private.tempNickname, isContact: this.private.tempIsContact, type, relayAddress: nextProps.relayAddress })
    }
  }
  onPressRightBtn = () => {
    const { navigation } = this.props
    navigation.navigate('NewContact')
  }
  gotoEnterAmountPage = async (item) => {
    const { navigation, relayAddressQuery } = this.props
    this.private.tempAvatarCode = item.avatarCode
    this.private.tempNickname = item.nickname
    this.private.isContact = true
    relayAddressQuery(item.avatarCode)
    /*
     const type = navigation.getParam('type', '')
     navigation.navigate('AskEnterAmountPage', { avatarCode: item.avatarCode, nickname: item.nickname, isContact: true, type })
     */
  }
  getSource (datas) {
    if (this.state.keyword.length === 0) return datas
    return datas.filter((item, index) => {
      return (item.avatarCode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || item.nickname.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1)
    })
  }
  onAvatarCodeChange = (avatarCode) => {
    if (avatarCode.length <= 6) this.setState({ avatarCode })
    else if (avatarCode.length > 6) this.setState({ avatarCode: avatarCode.slice(0, 6) })
  }
  renderPasswordAccessory = () => {
    if (this.state.avatarCode.length === 6) {
      return (
        <Image source={Images.icConfirmed} />
      )
    }
  }
  onPressNext = () => {
    const { relayAddressQuery } = this.props
    const { avatarCode } = this.state
    relayAddressQuery(avatarCode)
    this.private.tempAvatarCode = avatarCode
    this.private.isContact = false
    /*
    const { navigation } = this.props
    const { avatarCode } = this.state
    const type = navigation.getParam('type', '')
    navigation.navigate('AskEnterAmountPage', { avatarCode: avatarCode, isContact: false, type })
    */
  }
  render () {
    const { navigation, contacts } = this.props
    const { avatarCode, keyword } = this.state
    const type = navigation.getParam('type', '')

    return (
      <View style={styles.mainContainer}>
        <TopContainer>
          <NormalInput
            labelText={I18n.t('avatarCode')}
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
          {(this.state.avatarCode.length !== 6)
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
    relayAddress: state.giggle.relayAddress,
    isFailRelayAddressQuery: state.giggle.isFailRelayAddressQuery
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    relayAddressQuery: (targetAvatarCode) => dispatch(GiggleActions.relayAddressQuery(targetAvatarCode))
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
