import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { TransactionsHeader } from '../Components/Header'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import I18n from 'react-native-i18n'
import moment from 'moment'
import { SearchInput } from '../Components/TextFields'
import { connect } from 'react-redux'

class Transactions extends Component {
  state = {
    keyword: '',
    hasHint: false
  }
  gotoTransactionDetail = (item) => {
    const { navigation } = this.props
    navigation.navigate('TransactionDetails', { type: item.type, avatarCode: item.avatarCode, nickname: item.nickname, date: item.date, notes: item.notes, amount: item.amount })
  }
  getSource = (datas) => {
    if (this.state.keyword.length === 0) return datas
    return datas.filter((item, index) => {
      return (item.avatarCode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || item.nicknname.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || item.avatarCode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1)
    })
  }
  render () {
    const { scrollToHome, navigation, transactionHistory } = this.props
    const { keyword, hasHint } = this.state
    return (
      <View style={styles.mainContainer} >
        <TransactionsHeader onPressRightBtn={scrollToHome} />
        {
          !hasHint ? null
            : <TopContainer onPress={() => { navigation.navigate('AskList') }}>
              <Text style={{ ...Fonts.style.h8, color: Colors.text }} >{'You got $ asks to respond'.replace('$', 1)}</Text>
              <PinkCycle style={{ marginLeft: 8 }}><Text style={{ ...Fonts.style.h9, color: Colors.text }}>1</Text></PinkCycle>
            </TopContainer>

        }
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
          <Text style={{ ...Fonts.style.h7, color: Colors.text, marginTop: 24 }}>{I18n.t('history')}</Text>
          <ListView>
            <FlatList
              data={this.getSource(transactionHistory)}
              renderItem={({ item }) => <RenderItem item={item} onPress={this.gotoTransactionDetail.bind(this, item)} />}
            />
          </ListView>
        </BottomContainer>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    transactionHistory: state.giggle.transactionHistory
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

const ItemIcon = styled.Image`
  width:20
  height:20
`
const RenderItemIcon = ({ type }) => {
  switch (type) {
    case 1:
      return (<ItemIcon source={Images.icReceivePending} />)
    case 2:
      return (<ItemIcon source={Images.icReceiveConfirmed} />)
    case 3:
      return (<ItemIcon source={Images.icReceiveFailed} />)
    case 4:
      return (<ItemIcon source={Images.icSendPending} />)
    case 5:
      return (<ItemIcon source={Images.icSendConfirmed} />)
    case 6:
      return (<ItemIcon source={Images.icSendFailed} />)
  }
  return (null)
}
const RenderItem = ({ item, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <TopItemView >
        <RenderItemIcon type={item.type} />
      </TopItemView >
      <MiddleItemView >
        <MiddleTopItemView>
          <Text style={{ ...Fonts.style.h5, color: Colors.text }} >ツ{item.amount}</Text>
        </MiddleTopItemView>
        <MiddleBottomItemView>
          <Text style={{ ...Fonts.style.h9, color: Colors.gary }} >Received from {item.nickname + '。  ' + item.avatarCode}</Text>
        </MiddleBottomItemView>
      </MiddleItemView >
      <BottomItemView >
        <Text style={{ ...Fonts.style.h9, color: Colors.text }} > {moment(item.date).fromNow()}</Text>
      </BottomItemView >
    </ItemContainer>
  )
}

const MiddleTopItemView = styled.View`
  flex:2
`
const MiddleBottomItemView = styled.View`
  flex:1
`

const ItemContainer = styled.TouchableOpacity`
  flex-direction:row
  width: ${Metrics.screenWidth - 48}
  height:85
  padding-top:16
  padding-bottom:16
  border-bottom-color: #343458
  border-bottom-width: 1
`
const TopItemView = styled.View`
  width:20
`
const MiddleItemView = styled.View`
  flex:1
  padding-left:16
`
const BottomItemView = styled.View`
`
const PinkCycle = styled.View`
  width: 20
  height: 20
  background-color: #f01e78
  border-radius:10
  justify-content:center
  align-items: center
`

const TopContainer = styled.TouchableOpacity`
  width: ${Metrics.screenWidth}
  height:68
  padding-top:24
  padding-bottom:24
  flex-direction:row
  justify-content:center
  align-items: center
  background-color:#2b2b44
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
