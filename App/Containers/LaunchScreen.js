import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import styled from 'styled-components/native'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import GeneralActions from '../Redux/GeneralRedux'
class LaunchScreen extends Component {
  componentWillMount = () => {
    const { test } = this.props
    test()
  }
  render () {
    const { navigation, clearStorage, wallets, cleanWallet } = this.props
    return (
      <View style={styles.mainContainer}>
        <Button
          onPress={() => {
            navigation.navigate('SwiperHome')
          }}>
          Home
        </Button>
        <Button title='Update the title' onPress={() => {
          this.props.navigation.setParams({ otherParam: 'Updated!' })
          navigation.navigate('SignUp')
        }}>Sign Up</Button>
        <Button onPress={function () {
          navigation.navigate('BackUpReminder')
        }}>Back Up</Button>
        <Button onPress={function () {
          navigation.navigate('Restore')
        }}>Restore</Button>

        <Button onPress={function () {
          clearStorage()
        }}>Clear Storage</Button>
        <Button onPress={function () {
          wallets.forEach((value, key) => {
            cleanWallet(value.avatarCode)
          })
        }}>Remove all wallet</Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wallets: state.giggle.wallets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => dispatch(GiggleActions.test1()),
    walletInit: (avatarCode, password, is12Phrase) => dispatch(GiggleActions.walletInit(avatarCode, password, is12Phrase)),
    walletRecovery: (avatarCode, password, mnemonic) => dispatch(GiggleActions.walletRecovery(avatarCode, password, mnemonic)),
    walletRestore: (avatarCode, password) => dispatch(GiggleActions.walletRestore(avatarCode, password)),
    getBalance: (avatarCode, password) => dispatch(GiggleActions.getBalance(avatarCode, password)),
    getHeight: (avatarCode) => dispatch(GiggleActions.getHeight(avatarCode)),
    txCreateByFile: (avatarCode, amount, strategy, message, version) => dispatch(GiggleActions.txCreateByFile(avatarCode, amount, strategy, message, version)),
    txReceiveByFile: (avatarCode, filePath, message) => dispatch(GiggleActions.txReceiveByFile(avatarCode, filePath, message)),
    txFinalize: (avatarCode, filePath) => dispatch(GiggleActions.txFinalize(avatarCode, filePath)),
    txPost: (avatarCode, slateId) => dispatch(GiggleActions.txPost(avatarCode, slateId)),
    txCancel: (avatarCode, slateId) => dispatch(GiggleActions.txCancel(avatarCode, slateId)),
    getAllTransactions: (avatarCode) => dispatch(GiggleActions.getAllTransactions(avatarCode)),
    getTransactionDetail: (avatarCode) => dispatch(GiggleActions.getTransactionDetail(avatarCode)),
    getAllOutputs: (avatarCode) => dispatch(GiggleActions.getAllOutputs(avatarCode)),
    cleanWallet: (avatarCode) => dispatch(GiggleActions.cleanWallet(avatarCode)),
    clearStorage: () => dispatch(GeneralActions.clearStorage()),
    restoreWallet: (avatarCode, password, mnemonic) => dispatch(GiggleActions.restoreWallet(avatarCode, password, mnemonic))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
const ButtonTouchable = styled.TouchableOpacity`
    width:300
    margin-top:10
    padding-top: 10
    padding-bottom:10
    padding-left: 20
    padding-right: 20
    background-color: #406E9F
    border-radius: 9
    align-items: center
    justify-content: center
`
const Button = ({ onPress, children }) => {
  return (
    <ButtonTouchable onPress={onPress}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        {children}
      </Text>
    </ButtonTouchable>
  )
}
