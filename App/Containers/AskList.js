import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import styles from './Styles/LaunchScreenStyles'
import AlertWithBtns from '../Components/AlertWithBtns'
import { SearchInput } from '../Components/TextFields'
import moment from 'moment'
import { transferBalance } from '../Modules/Common'
import { SendBtn, DeclineBtn } from '../Components/Buttons'

const TempData = [
  { avatarCode: '6539QW', nickname: 'Noah', amount: 10.20388, askTime: Date.now() - 100000, note: 'Dinner at Kaos' },
  { avatarCode: 'S2T98Z', nickname: 'Ryan', amount: 994.11084, askTime: Date.now() - 5000000000, note: 'Dinner at Kaos' },
  { avatarCode: '9A131K', nickname: 'Morphy', amount: 40.10, askTime: Date.now() - 1000000, note: 'Dinner at Kaos' },
  { avatarCode: 'M8109E', nickname: 'Louise', amount: 109.4001, askTime: Date.now() - 8000000, note: 'Dinner at Kaos' },
  { avatarCode: 'B7009P', nickname: 'Nelson', amount: 14, askTime: Date.now() - 1400000, note: 'Dinner at Kaos' }
]

const RenderItem = ({ item, onDeclinePress, onSendPress }) => {
  const { firstNum, endNum } = transferBalance(item.amount)
  return (
    <ItemContainer>
      <TopItemView>
        <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>
          {item.avatarCode}
          <Text style={{ color: Colors.gary, ...Fonts.style.h9 }}>{' ' + I18n.t('isAskingFor')}</Text>
        </Text>
        <Text style={{ ...Fonts.style.h9, color: Colors.text }} > {moment(item.askTime).fromNow()}</Text>
      </TopItemView>
      <MiddleItemView>
        <BalanceView style={{ borderLeftColor: Colors.btnColor3 }}>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 3 }}>ツ</Text>
          <Text style={{ ...Fonts.style.h3, color: Colors.text, marginLeft: 5 }}>{firstNum}</Text>
          <Text style={{ ...Fonts.style.h8, color: Colors.text, marginTop: 14 }}>{(endNum === -1) ? null : endNum}</Text>
        </BalanceView>
        <Text style={{ ...Fonts.style.h9, color: Colors.text, marginTop: 18 }}>
          <Text style={{ ...Fonts.style.h9, color: Colors.gary }}>{I18n.t('for') + ' '}</Text> {item.note}
        </Text>
      </MiddleItemView>
      <BottomItemView>
        <DeclineBtn onPress={onDeclinePress} width={140} height={40} />
        <SendBtn onPress={onSendPress} width={140} height={40} />

      </BottomItemView>
    </ItemContainer>
  )
}

export default class MyAvatars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: '',
      alertShow: false,
      alertTitle: '',
      alertMessage: '',
      alertBtns: [],
      alertInput: false
    }
  }
  getSource (datas) {
    if (this.state.keyword.length === 0) return datas
    return datas.filter((item, index) => {
      return (item.avatarCode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 ||
        item.nickname.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 ||
        item.note.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1
      )
    })
  }
  onSendPress = (item) => {
    const tempNote = (item.note) ? `(${item.note})` : ''
    const { navigation } = this.props
    this.setState({
      alertShow: true,
      alertTitle: I18n.t('confirmDetails'),
      alertMessage: `Send ${item.nickname}・${item.avatarCode} for \n ツ${item.amount} ${tempNote}?`,
      alertBtns: [
        {
          text: I18n.t('cancel'),
          outerStyle: ApplicationStyles.alert.buttonRightBorder

        },
        {
          text: I18n.t('confirm'),
          style: { color: 'red' },
          onPress: () => {
            navigation.navigate('AskDone', { icContact: false, avatarCode: item.avatarCode, nickname: item.nickname, amount: item.amount, note: item.note, type: 'send', afterDonePage: 'AskList' })
          }
        }
      ],
      alertInput: false
    })
  }
  onDeclinePress = (item) => {
    this.setState({
      alertShow: true,
      alertTitle: I18n.t('declineAsk'),
      alertMessage: I18n.t('declineTheAskFrom') + ' ' + item.avatarCode + '?',
      alertBtns: [
        { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
        { text: I18n.t('decline'), style: { color: 'red' } }
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
    const { keyword, alertShow, alertTitle, alertMessage, alertBtns, alertInput } = this.state
    console.log(this.onDeclinePress.bind, this.onSendPress.bind)
    return (
      <View style={styles.mainContainer}>
        <TopContainer >
          <SearchInput
            placeholder={I18n.t('searchAsks')}
            width={keyword.length === 0 ? null : 256}
            onChange={
              (keyword) => this.setState({ keyword })} value={keyword} />
          {keyword.length === 0
            ? null
            : <Text style={{ ...Fonts.style.h8, color: Colors.darkText, marginLeft: 24 }} onPress={() => { this.setState({ keyword: '' }) }}>{I18n.t('cancel')} </Text>
          }
        </TopContainer>
        <BottomContainer>
          <ListView>
            <FlatList
              data={this.getSource(TempData)}
              renderItem={({ item }) => <RenderItem item={item} onDeclinePress={this.onDeclinePress.bind(this, item)} onSendPress={this.onSendPress.bind(this, item)} />}
            />
          </ListView>
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

const ListView = styled.View`
  flex:1
  width: ${Metrics.screenWidth - 48}
`

const TopContainer = styled.View`    
  width: ${Metrics.screenWidth - 48}
  flex-direction:row
  justify-content:flex-start
  align-items: center  
`

const BottomContainer = styled.View`
  flex:1
  width: ${Metrics.screenWidth - 48}
  justify-content: flex-start
  margin-top:10
`
const ItemContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  height: 223
  border-radius: 12
  background-color: #2b2b44
  justify-content:center;
  flex-direction:column;
  margin-top: 16
  padding-left:16
  padding-right:16
`

const TopItemView = styled.View`
  flex-direction: row
  justify-content: space-between
  margin-top: 16
`

const MiddleItemView = styled.View`
  flex:1
  align-items:flex-start
  margin-top:16  
`
const BottomItemView = styled.View`
  flex:1
  flex-direction:row
  align-items: center
  justify-content:center
  margin-top:16 
`

const BalanceView = styled.View`
  width:100%
  flex-direction: row
  justify-content: flex-start
  align-items: flex-start
  border-left-width: 4
  padding-left: 8
  marginTop: 4
`
