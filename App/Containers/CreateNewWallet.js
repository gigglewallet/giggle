import React, { Component, useState } from 'react'
import { Text, Image, View } from 'react-native'
import { LightBtn, RenderItem } from '../Components/Buttons'
import { Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/LaunchScreenStyles'
import checkbox from '../Images/Assets/Checkbox.png'
import checkboxChecked from '../Images/Assets/Checkbox_checked.png'
import { EasyLoading } from 'react-native-easy-loading'

import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import WalletsStatusRedux from '../Redux/WalletStatusRedux'

class CreateNewWallet extends Component {
  componentDidMount () {
    const { clearStorage, removeWalletData } = this.props
    //removeWalletData()
    EasyLoading.dismis('type')
  } 

  render () {
    const { navigation, isAgree, isTerm1, isTerm2, updateCreateWalletTermOne, updateCreateWalletTermTwo, agreeCreateWalletTerms, is12Phrase } = this.props

    if(isTerm1 && isTerm2){
      agreeCreateWalletTerms(true) 
    }
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <RenderItem checkEvt={updateCreateWalletTermOne} CheckState={isTerm1} item={'I understand that my funds are held securely on this device, not by a company.'} />
          <RenderItem checkEvt={updateCreateWalletTermTwo} CheckState={isTerm2} item={'I understand that if this app is moved to another device or deleted, my Grin can only be recovered with the recovery phrase.'} />
        </TopContainer>
        <BottomContainer>
          <LightBtn disabled={!isAgree} onPress={() => {
            navigation.navigate('SetWalletPassword')
          }}>
            {I18n.t('gotIt')}
          </LightBtn>
        </BottomContainer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    // ...redux state to props here
    isAgree: state.walletStatus.isAgree,
    isTerm1: state.walletStatus.isCreateWalletTermOne,
    isTerm2: state.walletStatus.isCreateWalletTermTwo,
    is12Phrase: state.walletStatus.is12Phrase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCreateWalletTermOne: (state, value) => dispatch(WalletsStatusRedux.updateCreateWalletTermOne(state, value)),
    updateCreateWalletTermTwo: (state, value) => dispatch(WalletsStatusRedux.updateCreateWalletTermTwo(state, value)),
    agreeCreateWalletTerms: (state, value) => dispatch(WalletsStatusRedux.agreeCreateWalletTerms(state, value)),
    removeWalletData: () => dispatch(GiggleActions.removeWalletData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewWallet)



const TopContainer = styled.View`
  flex: 1
`

const BottomContainer = styled.View`
  height: 120
  align-items: flex-end
`
