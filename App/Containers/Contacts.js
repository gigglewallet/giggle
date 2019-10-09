import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import styles from './Styles/LaunchScreenStyles'
import { ContactsHeader } from '../Components/Header'
import Blockies from 'react-native-blockies'
import { AskBtn, SendBtn } from '../Components/Buttons'
import { SearchInput } from '../Components/TextFields'
import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import { TRANSACTION_METHOD } from '../Modules/CommonType'
const RenderItem = ({ item, onPress, onAskPress, onSendPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <TopItemView >
        <Blockies
          blockies={item.avatarCode}
          size={40}
          style={{ width: 40, height: 40 }}
        />
      </TopItemView >
      <MiddleItemView >
        <MiddleTopItemView>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginLeft: 16 }} >{item.nickname}</Text>
        </MiddleTopItemView>
        <MiddleBottomItemView>
          <Text style={{ ...Fonts.style.h8, color: Colors.gary, marginLeft: 16 }} >{item.avatarCode}</Text>
        </MiddleBottomItemView>
      </MiddleItemView >
      <BottomItemView >
        {/* <AskBtn onPress={onAskPress} width={64} height={40} /> */}
        <SendBtn onPress={onSendPress} width={64} height={40} />
      </BottomItemView >
    </ItemContainer>
  )
}

class Contacts extends Component {
  state = {
    keyword: ''
  }
  onPressRightBtn = () => {
    const { navigation } = this.props
    navigation.navigate('NewContact')
  }
  gotoContactDetail = (item) => {
    const { navigation } = this.props
    navigation.navigate('ContactDetails', { avatarCode: item.avatarCode, nickname: item.nickname, method: item.method })
  }
  getSource (datas) {
    if (this.state.keyword.length === 0) return datas
    return datas.filter((item, index) => {
      return (item.avatarCode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || item.nickname.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1)
    })
  }
  onAskPress = (item) => {
    const { navigation } = this.props
    navigation.navigate('AskEnterAmountPage', { type: 'ask', isContact: true, avatarCode: item.avatarCode, nickname: item.nickname, isShowStep: false })
  }
  onSendPress = (item) => {
    const { relayAddressQuery, navigation } = this.props
    if (item.method === TRANSACTION_METHOD.AVATAR_CODE) {
      relayAddressQuery(item.avatarCode, (relayAddress) => {
        navigation.push('AskEnterAmountPage', {
          avatarCode: item.avatarCode,
          nickname: item.nickname,
          isContact: true,
          type: 'send',
          relayAddress: relayAddress,
          method: item.method,
          isShowStep: false
        })
      })
    } else {
      navigation.navigate('AskEnterAmountPage', { type: 'send', isContact: true, avatarCode: item.avatarCode, nickname: item.nickname, isShowStep: false, method: item.method })
    }
  }
  render () {
    const { scrollToHome, contacts } = this.props
    const { keyword } = this.state
    return (
      <View style={styles.mainContainer}>
        <ContactsHeader onPressLeftBtn={scrollToHome} onPressRightBtn={this.onPressRightBtn} />
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
              renderItem={({ item }) => <RenderItem item={item} onPress={this.gotoContactDetail.bind(this, item)} onAskPress={this.onAskPress.bind(this, item)} onSendPress={this.onSendPress.bind(this, item)} />}
            />
          </ListView>
        </BottomContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)

const MiddleTopItemView = styled.View`
  flex:1
`
const MiddleBottomItemView = styled.View`
  justify-content:flex-start
  flex:1
`

const ItemContainer = styled.TouchableOpacity`
  flex-direction:row
  width: ${Metrics.screenWidth - 48}
  height:71
  padding-top:16
  padding-bottom:16
  border-bottom-color: #343458
  border-bottom-width: 1
`
const TopItemView = styled.View`
  width:20
  justify-content:center
`
const MiddleItemView = styled.View`
  flex:1
  padding-left:16
`
const BottomItemView = styled.View`
  flex-direction:row
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
