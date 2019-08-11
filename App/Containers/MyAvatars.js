import React, { Component, PureComponent } from 'react'
import { Text, Image, View, FlatList, Modal, ActionSheetIOS, Alert } from 'react-native'
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

const TempData = [
  { avatarCode: '6539QW', nickname: 'Noah' },
  { avatarCode: 'S2T98Z', nickname: 'Ryan' },
  { avatarCode: '9A131K', nickname: 'Morphy' },
  { avatarCode: 'M8109E', nickname: 'Louise' },
  { avatarCode: 'B7009P', nickname: 'Nelson' }
]

var BUTTONS = [
  'Copy Address',
  'Save As Image',
  'Cancel'
]

var DESTRUCTIVE_INDEX = 1
var CANCEL_INDEX = 2

const RenderItem = ({ item, onDeletePress, onQRCodePress }) => {
  return (
    <ItemContainer>
      <TopItemView>
        <Text style={{ color: Colors.text, ...Fonts.style.h9 }}>Avatar 1</Text>
        <DeleteView onPress={onDeletePress}>
          <Image source={Images.icDelete} style={{ width: 16, height: 16 }} />
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

        <InviteLinkBtn text={'Copy invite link'} />
      </MiddleItemView>
    </ItemContainer>
  )
}

class RenderQRCode extends PureComponent {
  render () {
    const { item } = this.props
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
              value={'this.state.text'}
              size={200}
              bgColor='white'
              fgColor='black' />
          </View>

          <Text style={{ marginLeft: 16, marginRight: 16, color: Colors.text, ...Fonts.style.h9 }}>
            09efabb2a7ce1e0761df809ef5281c8455a4590445c9e53f417aaec8f63febb6ef
        </Text>
        </QRCodeContainer>
      </AvatarCodeContainer>
    )
  }
}
export default class MyAvatars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      clicked: 'none',
      alertBtns: [
        { text: I18n.t('cancel'), outerStyle: ApplicationStyles.alert.buttonRightBorder },
        { text: I18n.t('delete'), style: { color: 'red' }, onPress: this.logout }
      ]
    }
    this.qrcodePic
  }

  setModalVisible (visible) {
    this.setState({ modalVisible: visible })
  }

  gotoContactDetail = (item) => {
    const { navigation } = this.props
    navigation.navigate('ContactDetails', { avatarCode: item.avatarCode, nickname: item.nickname })
  }

  showActionSheet () {
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Grinbox Address',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX
    },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          ReactNative.takeSnapshot(this.qrcodePic, { format: 'png', quality: 0.8 }).then((url) => {
            console.log('url', url)
          }
          ).catch(
            (error) => console.log(error)
          )
        }
        this.setState({ clicked: BUTTONS[buttonIndex], modalVisible: false })
      })
  }

  deleteAvatar (item) {
    console.log(item)
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

    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onShow={() => {
            this.showActionSheet()
          }}
          onDismiss={() => {
            this.setModalVisible(false)
          }}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.mainContainer} >
            <RenderQRCode item={TempData[0]} ref={(ref) => {
              this.qrcodePic = ref
            }} />
          </View>

        </Modal>

        <TopContainer >
          <AvatarsDesc>
            {I18n.t('myAvatarsMessage')}
          </AvatarsDesc>

        </TopContainer>
        <BottomContainer>

          <ListView>
            <FlatList
              data={TempData}
              renderItem={({ item }) => <RenderItem item={item} onQRCodePress={() => {
                this.setModalVisible(true)
              }} onDeletePress={() => { this.deleteAvatar(item) }} />}
            />
          </ListView>
        </BottomContainer>

        <AlertWithBtns isShow={alertShow}
          close={this.closeAlert}
          title={I18n.t('deleteAvatar')}
          message={I18n.t('deleteAvatarMessage')}
          buttons={alertBtns}
          input={false} />
      </View >
    )
  }
}

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
