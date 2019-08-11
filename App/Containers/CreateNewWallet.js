import React, { Component, useState } from 'react'
import { Text, Image, View } from 'react-native'
import { LightBtn } from '../Components/Buttons'
import { Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/LaunchScreenStyles'
import checkbox from '../Images/Assets/Checkbox.png'
import checkboxChecked from '../Images/Assets/Checkbox_checked.png'

import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import GeneralActions from '../Redux/GeneralRedux'

class CreateNewWallet extends Component {
  componentDidMount () {
    const { clearStorage } = this.props
  } 

  render () {
    const { navigation, isAgree, isTerm1, isTerm2, updateCreateWalletTermOne, updateCreateWalletTermTwo, agreeCreateWalletTerms } = this.props

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
    isAgree: state.giggle.isAgree,
    isTerm1: state.giggle.isCreateWalletTermOne,
    isTerm2: state.giggle.isCreateWalletTermTwo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCreateWalletTermOne: (state, value) => dispatch(GiggleActions.updateCreateWalletTermOne(state, value)),
    updateCreateWalletTermTwo: (state, value) => dispatch(GiggleActions.updateCreateWalletTermTwo(state, value)),
    agreeCreateWalletTerms: (state, value) => dispatch(GiggleActions.agreeCreateWalletTerms(state, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewWallet)


const RenderItem = ({ item, CheckState, checkEvt }) => { 
  const [img, setImg] = useState(checkbox)

  return (
    <ItemContainer>
      <ItemIconContainer onPress={() => {                 
          (!CheckState) ? setImg(checkboxChecked) : setImg(checkbox)
          checkEvt(!CheckState)
        }}>
        <Image source={img} />
      </ItemIconContainer>
      <ItemTextContainer>
        <Text style={{ ...Fonts.style.h7, color: Colors.gary2 }}>
          {item}
        </Text>
      </ItemTextContainer>
    </ItemContainer>
  )
}

const ItemContainer = styled.View`
  flex-direction: row
  width: ${Metrics.screenWidth - 48}
  align-items: center  
  align-content: center  
  margin-top:24
`

const ItemIconContainer = styled.TouchableOpacity`  

`

const ItemTextContainer = styled.View`  
  margin-left: 24
  margin-right: 48
`

const TopContainer = styled.View`
  flex: 1
`

const BottomContainer = styled.View`
  height: 120
  align-items: flex-end
`
