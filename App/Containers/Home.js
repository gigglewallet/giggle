import React, { Component } from 'react'
import { Text, View, Image, ScrollView, RefreshControl, Keyboard } from 'react-native'
import { Colors, Fonts, Metrics, Images } from '../Themes'
import styled from 'styled-components/native'
import styles from './Styles/LaunchScreenStyles'
import { HomeHeader } from '../Components/Header'
import { MyAvatarsBtn, SettingBtn, AskBtn, SendBtn, OnlineStatus } from '../Components/Buttons'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { transferBalance } from '../Modules/Common'
import GiggleActions from '../Redux/GiggleRedux'
import WalletStatusActions from '../Redux/WalletStatusRedux'
class Home extends Component {
  private = {
    timeoutId: 0
  }

  componentWillMount = () => {
    if (this.props.currentWallet) {
      this.props.getBalance(this.props.currentWallet.avatarCode, this.props.currentWallet.password)
      this.props.updateTransaction()
    }
  }
  onPressHint = () => {
    const { navigation } = this.props
    navigation.navigate('BackUpReminder')
  }

  onRefresh = () => {
    this.props.getBalance(this.props.currentWallet.avatarCode, this.props.currentWallet.password, false, true)
    this.props.updateTransaction()
  }

  componentDidMount = () => {
    Keyboard.dismiss()
  }
  render () {
    const { scrollToTransactions, scrollToContracts, navigation, isBackupPhrase, currentWallet, updateWalletStatusRedux, isOnline } = this.props
    const { firstNum, endNum } = transferBalance(currentWallet.balance)
    return (
      <View style={styles.mainContainer}>
        <HomeHeader onPressLeftBtn={scrollToTransactions} onPressRightBtn={scrollToContracts} count={0} />
        {isBackupPhrase ? null
          : <HintContainer onPress={this.onPressHint}>
            <Text style={{ ...Fonts.style.h8, color: Colors.text }}>{I18n.t('backupRecoveryPhraseNow')}</Text>
            <Image source={Images.icReceiveConfirmed} />
          </HintContainer >
        }
        <ScrollView
          contentContainerStyle={styles.homeScrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.props.homeRefreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <TopContainer>
            <Text style={{ ...Fonts.style.h8, color: Colors.gary2 }}>Balance</Text>
            <BalanceView>
              <Text style={{ ...Fonts.style.h5, color: Colors.text, marginTop: 7 }}>ツ</Text>
              <Text style={{ ...Fonts.style.h0, color: Colors.text, marginLeft: 5 }}>{firstNum}</Text>
              {
                endNum === -1 ? null
                  : <Text style={{ ...Fonts.style.h5, color: Colors.text, marginTop: 18 }}>{endNum}</Text>
              }
            </BalanceView>
            {/*
          <DollarView>
            <Text style={{ ...Fonts.style.h9, color: Colors.gary, marginTop: 2 }}>$</Text>
            <Text style={{ ...Fonts.style.h5, color: Colors.gary, marginLeft: 4 }}>3,496.06</Text>
          </DollarView>
          */}
          </TopContainer>
          <BottomContainer >
            <BottomTopView>
              <MyAvatarsBtn onPress={() => {
                navigation.navigate('MyAvatars')
              }} />
              <SettingBtn onPress={() => { navigation.navigate('Settings') }} />
            </BottomTopView>
            <BottomMiddleView >
              <AskBtn onPress={() => {
                if (this.private.timeoutId === 0) {
                  updateWalletStatusRedux('isPressedAskBtn', true)
                  this.private.timeoutId = setTimeout(() => {
                    this.private.timeoutId = 0
                    updateWalletStatusRedux('isPressedAskBtn', false)
                  }, 2500)
                }
                // navigation.navigate('AskPickPage')}
              }} />
              <SendBtn onPress={() => navigation.navigate('AskPickPage', { type: 'send' })} />
            </BottomMiddleView>
            <BottomDownView>
              <OnlineStatus status={isOnline} />
            </BottomDownView>
          </BottomContainer>
        </ScrollView >
      </View >
    )
  }
}

const mapStateToProps = state => {
  return {
    isBackupPhrase: state.giggle.isBackupPhrase,
    isEnableWallet: state.giggle.isEnableWallet,
    currentWallet: state.giggle.currentWallet,
    isOnline: state.walletStatus.isOnline,
    homeRefreshing: state.walletStatus.homeRefreshing
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (avatarCode, password, isProcessLoading, isHomeRefresh) => dispatch(GiggleActions.getBalance(avatarCode, password, isProcessLoading, isHomeRefresh)),
    updateWalletStatusRedux: (key, value) => dispatch(WalletStatusActions.updateWalletStatusRedux(key, value)),
    updateTransaction: () => dispatch(GiggleActions.updateTransaction())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
const HintContainer = styled.TouchableOpacity`
  width: ${Metrics.screenWidth - 48} 
  height:44
  flex-direction:row
  border-radius:22
  background-color:#7878f0
  justify-content: space-between
  align-items:center
  padding-left:24
  padding-right:24
`

const BalanceView = styled.View`
  flex-direction:row
  justify-content:center
  align-items:flex-start
`
const DollarView = styled.View`
  margin-top:8
  flex-direction:row
`
const TopContainer = styled.View`
  width: ${Metrics.screenWidth}
  flex:1
  justify-content:center
  align-items:center
`
const BottomContainer = styled.View`
  height:200
  width: ${Metrics.screenWidth}
  padding-left: 24
  padding-right: 24
  padding-bottom:17
  align-items: center
  justify-content: space-between
`
const BottomTopView = styled.View`
  height: 64
  width: 100%
  flex-direction:row
  align-items: center
  justify-content: space-between
  border-radius: 36px;
`
const BottomMiddleView = styled.View`
  height: 64
  width: 100% 
  margin-top: 24
  flex-direction:row
  align-items: center
  justify-content: space-between
`
const BottomDownView = styled.View`
  height: 48
  width: ${Metrics.screenWidth - 48} 
  flex-direction:row
  padding-left: 24
  padding-right: 24
  align-items: center
  justify-content: flex-start
`
