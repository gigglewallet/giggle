import React, { Component, PureComponent } from 'react'
import { Clipboard, Text, Image, View, FlatList, Modal, ActionSheetIOS, Alert, CameraRoll } from 'react-native'
import ReactNative from 'react-native'
import { ApplicationStyles, Images, Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/LaunchScreenStyles'
import Blockies from 'react-native-blockies'
import { InviteLinkBtn } from '../Components/Buttons'
import QRCode from 'react-native-qrcode'
import AlertWithBtns from '../Components/AlertWithBtns'

import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import WalletStatusActions from '../Redux/WalletStatusRedux'

var BUTTONS = [
  'Copy Address',
  'Save As Image',
  'Cancel'
]

var DESTRUCTIVE_INDEX = 1
var CANCEL_INDEX = 2

const RenderItem = ({ item, onDeletePress, onQRCodePress, onCopyLink, onSetCurrentWallet }) => {
  return (
    <ItemContainer>
      <TopItemView>
        <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>Avatar 1</Text>
        {/* <Text style={{ color: Colors.text }} onPress={onSetCurrentWallet} >Set Wallet </Text> */}
        <DeleteView onPress={onDeletePress}>
          <Image source={Images.icReload} style={{ width: 16, height: 16 }} />
        </DeleteView>
      </TopItemView>
      <MiddleItemView>
        <Blockies
          blockies={item.avatarCode} // string content to generate icon
          size={40} // blocky icon size
          style={{ width: 40, height: 40 }} // style of the view will wrap the icon
        />
        <AvatarCode>
          <Text style={{ ...Fonts.style.avatarCode, color: Colors.text }} >{item.avatarCode}</Text>
          <QRCodeView onPress={onQRCodePress}>
            <Image source={Images.icQrcode} style={{ width: 24, height: 24, marginTop: 3, marginLeft: 8 }} />
          </QRCodeView>
        </AvatarCode>

        <InviteLinkBtn text={'Copy invite link'} onPress={onCopyLink} />
      </MiddleItemView>
    </ItemContainer>
  )
}

class RenderQRCode extends PureComponent {
  render () {
    const { item, relayAddress } = this.props

    console.log(relayAddress)
    return (
      <AvatarCodeContainer ref='q2'>
        <AvatarIconView >

          <Blockies
            blockies={item.avatarCode} // string content to generate icon
            size={40} // blocky icon size
            style={{ width: 40, height: 40 }} // style of the view will wrap the icon
          />

          <AvatarCodeView>
            <Text style={{ color: Colors.darkText, ...Fonts.style.h9 }}>Avatar code</Text>
            <Text style={{ color: Colors.text, ...Fonts.style.h5 }}>{item.avatarCode}</Text>
          </AvatarCodeView>

        </AvatarIconView>

        <QRCodeContainer>
          <View style={{ width: 216, height: 216, padding: 8, backgroundColor: '#fff', borderRadius: 8, marginBottom: 16 }}>
            <QRCode
              value={relayAddress}
              size={200}
              bgColor='white'
              fgColor='black' />
          </View>

          <Text style={{ marginLeft: 16, marginRight: 16, color: Colors.text, ...Fonts.style.h9 }}>
            {relayAddress}
          </Text>
        </QRCodeContainer>
      </AvatarCodeContainer>
    )
  }
}
class MyAvatars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //modalVisible: false,
      clicked: 'none',
      alertBtns: [
        { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
        { text: I18n.t('delete'), style: { color: 'red' }, onPress: this.logout }
      ]
    }
    this.qrcodePic
  }

  componentWillMount () {
    console.log(`componentWillMount`)
  }
  
  componentDidMount (evt) {
    const { wallets, relayAddress } = this.props    
    this.showActionSheet(evt, relayAddress)
  }
  
  setModalVisible (visible) {
    const { updateWalletStatusRedux } = this.props
    console.log(visible)
    updateWalletStatusRedux('isAvatarModalVisible', visible)
  }

  gotoContactDetail = (item) => {
    const { navigation } = this.props
    navigation.navigate('ContactDetails', { avatarCode: item.avatarCode, nickname: item.nickname })
  }

  showActionSheet = (evt, relayAddress) => {
    const { updateWalletStatusRedux, navigation } = this.props

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'GrinRelay Address',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          Clipboard.setString(relayAddress)
        } else if (buttonIndex === 1) {
          ReactNative.takeSnapshot(this.qrcodePic, { format: 'png', quality: 0.8 }).then((url) => {
            CameraRoll.saveToCameraRoll(url, 'photo')
            console.log('url', url)
          }
          ).catch(
            (error) => console.log(error)
          )
        } else {
          console.log(buttonIndex)
        }
        this.setState({ clicked: BUTTONS[buttonIndex] })

        updateWalletStatusRedux('isAvatarModalVisible', false)
        navigation.navigate('MyAvatars')
      })
  }

  setSelectedCurrentWallet (item) {
    console.log(item)
    const { setCurrentWallet } = this.props
    setCurrentWallet(item)
  }

  copyLink () {
    const { relayAddress } = this.props
    console.log(relayAddress)
    Clipboard.setString(relayAddress)
  }

  refreshAvatar (item) {
    const { relayAddressIndex, getNewAvatar } = this.props
    getNewAvatar()
    console.log(relayAddressIndex)
  }

  deleteAvatar (item) {
    this.setState({
      alertShow: true
    })
  }

  closeAlert = () => {
    this.setState({
      alertShow: false
    })
  }

  render () {
    const { alertShow, alertBtns } = this.state
    const { currentWallet, wallets, relayAddress, isAvatarModalVisible } = this.props

    console.log(relayAddress)
    return (
      <View style={styles.mainContainer}>
        
          <View style={styles.mainContainer} >
            
            <RenderQRCode relayAddress={relayAddress} item={currentWallet} ref={(ref) => {
              this.qrcodePic = ref
            }} />          
          </View>

          <BottomContainer>

<ListView>
  <FlatList
    data={wallets}
    renderItem={({ item }) => <RenderItem item={item} onQRCodePress={() => {
      this.setModalVisible(true)
    }} onDeletePress={() => { this.refreshAvatar(item) }}
      onCopyLink={() => { this.copyLink() }}
      onSetCurrentWallet={() => { this.setSelectedCurrentWallet(item) }}
    />}
  />
</ListView>
</BottomContainer>

        
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    currentWallet: state.giggle.currentWallet,
    wallets: state.giggle.wallets,
    relayAddressIndex: state.giggle.relayAddressIndex,
    relayAddress: state.giggle.relayAddress,
    isAvatarModalVisible: state.walletStatus.isAvatarModalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCreateWalletTermOne: (state, value) => dispatch(GiggleActions.updateCreateWalletTermOne(state, value)),
    getNewAvatar: () => dispatch(GiggleActions.getNewAvatar()),
    setCurrentWallet: (wallet) => dispatch(GiggleActions.setCurrentWallet(wallet)),
    updateWalletStatusRedux: (key, value) => dispatch(WalletStatusActions.updateWalletStatusRedux(key, value))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAvatars)

const AvatarsDesc = styled.Text`
  font-size: 14
  color: #b4b4b4
  font-family: Play
  line-height: 20
`

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
`
const ItemContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  height: 223
  border-radius: 12
  background-color: #2b2b44
  justify-content:center;
  flex-direction:column;
  margin-top: 16
`

const TopItemView = styled.View`
  flex-direction: row
  justify-content: space-between
  margin-top: 16
  margin-left: 16
  margin-right: 16
`

const MiddleItemView = styled.View`
  flex:1
  align-items:center;
  margin-top:16  
`

const AvatarCode = styled.View`
  flex-direction: row
  justify-content: space-between
  align-items:center  
  margin-top:16
  
`
const DeleteView = styled.TouchableOpacity`

`

const QRCodeView = styled.TouchableOpacity`
  
`

const AvatarCodeContainer = styled.View`
  width: ${Metrics.screenWidth - 48}
  height:360  
  border-radius: 12px;
  background-color: #2b2b44;
  
  padding-top: 16
`

const AvatarCodeView = styled.View`
  flex-direction:column
  margin-left: 16
`

const AvatarIconView = styled.View`
  align-items:center;
  flex-direction:row
  margin-left: 16
  margin-right: 16
`

const QRCodeContainer = styled.View`
  align-items: center
  justify-content: center
  margin-top: 16  
  

`
