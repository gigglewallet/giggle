import React, { Component } from 'react'
import { AppRegistry, AlertIOS, Text, Image, View, Keyboard } from 'react-native'
import { Images, Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import TouchID from 'react-native-touch-id'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import WalletStatusActions from '../Redux/WalletStatusRedux'
import * as Keychain from 'react-native-keychain'

class SetSpendingPin extends Component {
  constructor (props) {
    super(props)
    this.state = { isFocused: [], giggleMask: [], pin: [] }
    this.saveSpendingPin = this.saveSpendingPin.bind(this)
    this.private = {}
    this.private.pin = []
  }

  onFocusChange = (nativeEvent, idx) => {
    let focuseds = [...this.state.isFocused]
    focuseds[idx] = true
    this.setState({ isFocused: focuseds })
  }

  onBlurChange = (nativeEvent, idx) => {
    if (nativeEvent.text === '') return
    let focuseds = [...this.state.isFocused]
    focuseds[idx] = false
    let giggleMasks = [...this.state.giggleMask]
    giggleMasks[idx] = { ...giggleMasks[idx], key: true }
    this.setState({ isFocused: focuseds, giggleMask: giggleMasks })
  }

  _focusNextField = (nativeEvent, nextField) => {
    if (!nativeEvent.text) return
    let idx = nextField - 2
    let markers = [...this.state.pin]
    markers[idx] = { ...markers[idx], key: nativeEvent.text }

    let giggleMasks = [...this.state.giggleMask]
    giggleMasks[idx] = { ...giggleMasks[idx], key: true }

    this.setState({ pin: markers, giggleMask: giggleMasks })

    console.log(nextField)

    if (nextField <= 6) {
      this.private.pin[nextField].focus()
      this.setState({ isAgree: false })
    } else {
      this.private.pin[6].clearFocus
      this.setState({ isAgree: true }, function () {
        this.saveSpendingPin()
      })
      Keyboard.dismiss()
    }
  }

  _foucsPrevField = (nativeEvent, idx) => {
    let { Keyboard } = this.props
    let { isAgree } = this.state

    if (nativeEvent.key === 'Backspace') {
      let prevIdx = idx - 1
      let markers = [...this.state.pin]
      let giggleMasks = [...this.state.giggleMask]

      if (isAgree) {
        prevIdx++
        idx = 6
        this.setState({ isAgree: false })
      }

      markers[prevIdx] = { ...markers[prevIdx], key: ' ' }
      giggleMasks[prevIdx] = { ...giggleMasks[prevIdx], key: false }

      this.setState({ pin: markers, giggleMask: giggleMasks })
      this.private.pin[idx].clear()
      this.private.pin[idx].focus()
    }
  }

  componentDidMount () {
    const { isEnablePinTouchId, navigation, updateWalletStatusRedux } = this.props
    if (isEnablePinTouchId) {
      TouchID.authenticate()
        .then(success => {
          if (success) navigation.navigate('SwiperHome')
        })
        .catch(error => {
          console.log(error)
          this.private.pin[1].focus()
          AlertIOS.alert('Authenticated Failed')          
        })
    }

    updateWalletStatusRedux('isAvatarModalVisible', false)
    this.props.updateWalletStatusRedux('isAvatarModalVisible', false)

    //this.private.pin[1].focus()
  }

  async saveSpendingPin () {
    const { navigation } = this.props
    const { pin } = this.state

    let pinPassword = ''
    pin.map((key, idx) => {
      pinPassword += pin[idx]['key'].toString()
    })

    try {
      const credentials = await Keychain.getGenericPassword()

      console.log(credentials)
      if (credentials.password === pinPassword) {
        console.log('Credentials successfully loaded for user ' + credentials.username)
        navigation.navigate('SwiperHome')
      } else {
        console.log('No credentials stored')
        this.setState({ pin: ['', '', '', '', '', ''], giggleMask: [] })
        this.private.pin[1].focus()
      }
    } catch (error) {
      console.log('Keychain couldn\'t be accessed!', error)
    }

    
  }

  render () {
    let { isFocused, giggleMask, pin } = this.state
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <Text style={{ color: Colors.gary2, ...Fonts.style.description }}>Enter your PIN code.</Text>
          <SpendingPinContainer>
            <SpendingPin
              inputRef={ref => this.private.pin['1'] = ref}
              onChange={({ nativeEvent }) => this._focusNextField(nativeEvent, '2')}
              focus={isFocused[0]}
              showImage={giggleMask[0]}
              value={pin[0]}
              onBlur={this.onBlurChange}
              onFocus={this.onFocusChange}
            />

            <SpendingPin
              inputRef={ref => this.private.pin['2'] = ref}
              onChange={({ nativeEvent }) => this._focusNextField(nativeEvent, '3')}
              onKeyPress={({ nativeEvent }) => {
                this._foucsPrevField(nativeEvent, '1')
              }}
              focus={isFocused[1]}
              showImage={giggleMask[1]}
              value={pin[1]}
              onBlur={this.onBlurChange}
              onFocus={this.onFocusChange}
            />

            <SpendingPin
              inputRef={ref => this.private.pin['3'] = ref}
              onChange={({ nativeEvent }) => this._focusNextField(nativeEvent, '4')}
              onKeyPress={({ nativeEvent }) => {
                this._foucsPrevField(nativeEvent, '2')
              }}
              focus={isFocused[2]}
              showImage={giggleMask[2]}
              value={pin[2]}
              onBlur={this.onBlurChange}
              onFocus={this.onFocusChange}
            />
            <SpendingPin
              inputRef={ref => this.private.pin['4'] = ref}
              onChange={({ nativeEvent }) => this._focusNextField(nativeEvent, '5')}
              onKeyPress={({ nativeEvent }) => {
                this._foucsPrevField(nativeEvent, '3')
              }}
              focus={isFocused[3]}
              showImage={giggleMask[3]}
              value={pin[3]}
              onBlur={this.onBlurChange}
              onFocus={this.onFocusChange}
            />
            <SpendingPin
              inputRef={ref => this.private.pin['5'] = ref}
              onChange={({ nativeEvent }) => this._focusNextField(nativeEvent, '6')}
              onKeyPress={({ nativeEvent }) => {
                this._foucsPrevField(nativeEvent, '4')
              }}
              focus={isFocused[4]}
              showImage={giggleMask[4]}
              value={pin[4]}
              onBlur={this.onBlurChange}
              onFocus={this.onFocusChange}
            />
            <SpendingPin
              inputRef={ref => this.private.pin['6'] = ref}
              onChange={({ nativeEvent }) => this._focusNextField(nativeEvent, '7')}
              onKeyPress={({ nativeEvent }) => {
                this._foucsPrevField(nativeEvent, '5')
              }}
              focus={isFocused[5]}
              showImage={giggleMask[5]}
              value={pin[5]}
              onBlur={this.onBlurChange}
              onFocus={this.onFocusChange}
            />

          </SpendingPinContainer>
          <View style={{ display: 'flex' }} />
        </TopContainer>
        <BottomContainer>
          
        </BottomContainer>

      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    isEnablePinTouchId: state.giggle.isEnablePinTouchId,
    currentWallet: state.giggle.currentWallet,
    password: state.walletStatus.tempPassword,
    avatarCode: state.walletStatus.tempAvatarCode,
    isAvatarModalVisible: state.walletStatus.isAvatarModalVisible

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    enablePinTouchId: (state, value) => dispatch(GiggleActions.enablePinTouchId(state, value)),
    walletInit: (avatarCode, password, is12Phrase) => dispatch(GiggleActions.walletInit(avatarCode, password, is12Phrase)),
    setPassword: (walletIdx, password) => dispatch(GiggleActions.setPassword(walletIdx, password)),
    updateWalletStatusRedux: (key, value) => dispatch(WalletStatusActions.updateWalletStatusRedux(key, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetSpendingPin)

AppRegistry.registerComponent('SetSpendingPin', () => SetSpendingPin)

const PinMask = styled.View`
  display: flex
  width: 41
  height: 56
  border-radius: 4
  background-color: #2b2b44
  align-items: center
  justify-content:center
`

const TopContainer = styled.View`
  margin-left:24
  margin-right:24
  flex: 1
`

const BottomContainer = styled.View`
  height: 60
  width:100%
  align-items: flex-start
  padding-left:24  
  padding-right:24
`
const SpendingPinContainer = styled.View`
  width:100%;
  flex-direction:row
  justify-content:space-around

`
const SpendingPinInput = styled.TextInput`
  border-bottom-width: ${props => props.border}
  border-bottom-color: #7878f0   
  color:#fff
  width: 100%
  height: 100%
  text-align: center
  font-size:26    
  ${props => props.hidden !== true ? 'opacity:1' : 'opacity:0'}  
`

const SpendingPinPasswordMask = () => {
  return (
    <Image source={Images.icAvatar} style={{ position: 'absolute' }} />
  )
}

const SpendingPin = ({ showImage, focus, onFocus, onBlur, onChange, inputRef, onKeyPress, value }) => {
  let showMask = <SpendingPinPasswordMask show={focus} />
  let border = 2
  let hidden = true

  if (showImage) {
    console.log(showImage.key)
    if (showImage.key == false) {
      showMask = null
      hidden = false
    }
  } else {
    showMask = null
    hidden = false
  }
  if (!focus) {
    border = 0
  } else {
    border = 2
  }

  return (
    <PinMask>
      <SpendingPinInput value={value} ref={inputRef} onKeyPress={onKeyPress} onChange={onChange} keyboardType='number-pad' hidden={hidden} onFocus={onFocus} onBlur={onBlur} maxLength={1} border={border} />
      {showMask}
    </PinMask>

  )
}
