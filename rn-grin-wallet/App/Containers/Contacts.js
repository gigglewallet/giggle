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
const TempData = [
  { avatarCode: '6539QW', nickname: 'Noah' },
  { avatarCode: 'S2T98Z', nickname: 'Ryan' },
  { avatarCode: '9A131K', nickname: 'Morphy' },
  { avatarCode: 'M8109E', nickname: 'Louise' },
  { avatarCode: 'B7009P', nickname: 'Nelson' }
]

const RenderItem = ({ item, onPress, onAskPress, onSendPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <TopItemView >
        <Blockies
          blockies={item.avatarCode} // string content to generate icon
          size={40} // blocky icon size
          style={{ width: 40, height: 40 }} // style of the view will wrap the icon
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
        <AskBtn onPress={onAskPress} width={64} height={40} />
        <SendBtn onPress={onSendPress} width={64} height={40} />
      </BottomItemView >
    </ItemContainer>
  )
}

export default class Contacts extends Component {
  state = {
    keyword: ''
  }
  onPressRightBtn = () => {
    const { navigation } = this.props
    navigation.navigate('NewContact')
  }
  gotoContactDetail = (item) => {
    console.log('avatarCode=', item)
    const { navigation } = this.props
    navigation.navigate('ContactDetails', { avatarCode: item.avatarCode, nickname: item.nickname })
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
    const { navigation } = this.props
    navigation.navigate('AskEnterAmountPage', { type: 'send', isContact: true, avatarCode: item.avatarCode, nickname: item.nickname, isShowStep: false })
  }
  render () {
    const { scrollToHome } = this.props
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
              data={this.getSource(TempData)}
              renderItem={({ item }) => <RenderItem item={item} onPress={this.gotoContactDetail.bind(this, item)} onAskPress={this.onAskPress.bind(this, item)} onSendPress={this.onSendPress.bind(this, item)} />}
            />
          </ListView>
        </BottomContainer>
      </View>
    )
  }
}

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
