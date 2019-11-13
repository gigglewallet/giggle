import React, { Component, PureComponent } from 'react'
import { Clipboard, Text, View, CameraRoll } from 'react-native'
import ReactNative from 'react-native'
import { ApplicationStyles,  Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/LaunchScreenStyles'
import Blockies from 'react-native-blockies'
import { InviteLinkBtn } from '../Components/Buttons'
import QRCode from 'react-native-qrcode'

import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import WalletStatusActions from '../Redux/WalletStatusRedux'


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


  saveImage () {
    ReactNative.takeSnapshot(this.qrcodePic, { format: 'png', quality: 0.8 }).then((url) => {
      CameraRoll.saveToCameraRoll(url, 'photo')
      console.log('url', url)
    }
    ).catch(
      (error) => console.log(error)
    )
  }
  copyLink () {
    const { relayAddress } = this.props
    console.log(relayAddress)
    Clipboard.setString(relayAddress)
  }

  render () {
    const { currentWallet, relayAddress } = this.props

    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer} >
          <RenderQRCode relayAddress={relayAddress} item={currentWallet} ref={(ref) => {
            this.qrcodePic = ref
          }} />
        </View>

        <BottomContainer>
          <InviteLinkBtn text={'Copy Address'} onPress={() => { this.copyLink() }} />
          <InviteLinkBtn text={'Save As Image'} onPress={() => { this.saveImage() }} />
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


const BottomContainer = styled.View`
  flex:1
  justify-content: center
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
