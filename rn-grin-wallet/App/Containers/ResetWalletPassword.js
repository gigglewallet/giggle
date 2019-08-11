import React, { Component } from 'react'
import { AppRegistry, AlertIOS, Text, Image, View } from 'react-native'
import { NextBtn, TouchIdSwitchBtn } from '../Components/Buttons'
import { SetWalletPassword } from '../Components/TextFields'
import { ThreeStepUI } from '../Components/UI'
import { Images, Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import TouchID from 'react-native-touch-id'
// Styles
import styles from './Styles/LaunchScreenStyles'

import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import GeneralActions from '../Redux/GeneralRedux'
import * as Keychain from 'react-native-keychain';

const TempData = { avatarCode: '6539QW', nickname: 'Noah' }

class WalletPassword extends Component {
  constructor (props) {
    super(props)
    this.state = { isAgree: false, confirmPassword: '', password: ''}
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.passwordRef = this.updateRef.bind(this, 'password')
    this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword')
    this.enableTouchId = this.enableTouchId.bind(this)
    this.saveWalletPassword = this.saveWalletPassword.bind(this)
  }

  componentDidMount () {

  }

  updateRef (name, ref) {
    this[name] = ref
  }

  onFocus () {
    let { errors = {} } = this.state
    for (let name in errors) {
      let ref = this[name]
      if (ref && ref.isFocused()) {
        delete errors[name]
      }
    }

    this.setState({ errors })
  }

  onChangeText (text) {
    let { password, confirmPassword, isAgree } = this.state
    let errors = {};
    let next = false;

    ['password', 'confirmPassword']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          if (name == 'confirmPassword' && (password != text)) {
            errors['confirmPassword'] = 'Password doesn’t match. Please try again.'
            next = false;
          } else if (name == 'password' && (confirmPassword != text) && confirmPassword != '') {
            errors['confirmPassword'] = 'Password doesn’t match. Please try again.'
            next = false;
          } else {
            delete errors['confirmPassword']
            if(confirmPassword!="") next = true
          }

          this.setState({ [name]: text, errors, isAgree: next })
        }
      })
  }

  renderPasswordAccessory () {
    const { isVisiblePassword } = this.props

    let image = '';

    (isVisiblePassword) ? image = <Image source={Images.icShow} /> : image = <Image source={Images.icHide} />

    return (image)
  }

  enableTouchId () {
    const { enableTouchId, isEnableTouchId } = this.props

    if(isEnableTouchId){
      enableTouchId(false)
      return
    }

    TouchID.isSupported()
    .then(authenticate(enableTouchId,isEnableTouchId))
    .then(success => {
      (success=='FaceID' || success=='TouchID') ? enableTouchId(true) : enableTouchId(false)
    })
    .catch(error => {
      AlertIOS.alert(error.message)
    })
  }

  async saveWalletPassword () {
    const { navigation, updateWalletPasswordByIndex } = this.props
    let { password } = this.state
      // Store the credentials
    await Keychain.setGenericPassword(TempData.avatarCode, password);
    
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.username);
        updateWalletPasswordByIndex(0, password)
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log('Keychain couldn\'t be accessed!', error);
    }
    await Keychain.resetGenericPassword();
    

    navigation.navigate('ResetSpendingPin')    
  }

  render () {
    const { isVisiblePassword, isEnableTouchId, updateVisiblePassword } = this.props
    let { isAgree, errors = {}, ...data } = this.state

    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <Text style={{ color: Colors.gary2, ...Fonts.style.description }}>Wallet Password ensures <Text style={{ color: Colors.text }}>only you</Text> can access your Giggle wallet.</Text>

          <View>
            <VisiblePassword style={{ position: 'relative', zIndex: 9, right: -275, top: 76, radius: 10 }} onPress={() => {
              updateVisiblePassword(!isVisiblePassword)
            }} />
            <SetWalletPassword
              refs={this.passwordRef}
              labelText={I18n.t('walletPassword')}
              value={data.password}
              renderAccessory={this.renderPasswordAccessory}
              secureTextEntry={isVisiblePassword}
              onChangeText={this.onChangeText}
            />
          </View>
          <SetWalletPassword
            refs={this.confirmPasswordRef}
            labelText={I18n.t('confirmWalletPassword')}
            value={data.confirmPassword}
            renderAccessory={this.renderPasswordAccessory}
            secureTextEntry={isVisiblePassword}
            onFocus={this.onFocus}
            error={errors.confirmPassword}
            onChangeText={this.onChangeText}
          />

          <TouchIdSwitchBtn onPress={this.enableTouchId} switchText={I18n.t('enableTouchId')} switchOn={isEnableTouchId} />

        </TopContainer>
        <BottomContainer>
          <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
            <View>
              <ThreeStepUI totalSteps={3} nowStep={2} />
            </View>
            <View>
              <NextBtn disabled={!isAgree} onPress={this.saveWalletPassword}>
                {I18n.t('next')}
              </NextBtn>
            </View>
          </View>
        </BottomContainer>

      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    isVisiblePassword: state.giggle.isVisiblePassword,
    isEnableTouchId: state.giggle.isEnableTouchId,
    password: state.giggle.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {    
    updateVisiblePassword: (state, value) => dispatch(GiggleActions.updateVisiblePassword(state, value)),
    enableTouchId: (state, value) => dispatch(GiggleActions.enableTouchId(state, value)),
    updateWalletPasswordByIndex: (state, idx, value) => dispatch(GiggleActions.updateWalletPasswordByIndex(state, idx, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPassword)

function authenticate (enableTouchId,isEnableTouchId) {
  return TouchID.authenticate()
    .then(success => {
      enableTouchId(true);
      AlertIOS.alert('Authenticated Successfully')
    })
    .catch(error => {
      console.log(error)
      enableTouchId(false);
      AlertIOS.alert(error.message)
    })
}

AppRegistry.registerComponent('WalletPassword', () => WalletPassword)

const TopContainer = styled.View`
  margin-left:24
  margin-right:24
  flex: 1
`

const BottomContainer = styled.View`
  height: 120
  width:100%
  align-items: flex-start
  padding-left:24  
  padding-right:24
`

const VisiblePassword = styled.TouchableOpacity`
  width: 24
  height: 24    
  opacity: 0
`
