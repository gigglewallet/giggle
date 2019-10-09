import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { NextBtn } from '../Components/Buttons'
import { PhraseItemText } from '../Components/TextFields'
import { StepUI } from '../Components/UI'
import { Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { Phrase } from '../Config/Wordlist_en'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/LaunchScreenStyles'
import GiggleActions from '../Redux/GiggleRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class RecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.state = { switchAmount: 24, containerHeight: 500 }
  }

  componentDidMount = () => {
    const { restorePhrase } = this.props
    if (restorePhrase.length === 12) {
      this.setState({
        switchAmount: 12,
        containerHeight: 250
      })
    } else {
      this.setState({
        switchAmount: 24,
        containerHeight: 500
      })
    }
  }

  switchKeywordsAmount = () => {
    const { switchAmount } = this.state
    if (switchAmount === 12) {
      this.setState({ 'switchAmount': 24, 'containerHeight': 500 })
    } else {
      this.setState({ 'switchAmount': 12, 'containerHeight': 256 })
    }
  }

  randomCreateKeyword () {
    let RandomNumber = Math.floor(Math.random() * 2048) + 1

    return Phrase[RandomNumber].keyword
  }

  render () {
    const { navigation, restorePhrase } = this.props
    let { switchAmount, containerHeight } = this.state
    let PhraseLists = []
    for (let i = 0; i < switchAmount; i++) {
      PhraseLists.push(<PhraseItemText number={i + 1} text={restorePhrase[i]} />)
    }
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <View>
            <Text style={{ justifyContent: 'center', color: Colors.gary2, ...Fonts.style.h8 }}>{I18n.t('writeDownEachWordInTheCorrectOrder')}</Text>
          </View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
            <PhraseContainer height={containerHeight}>
              {Metrics.screenWidth > 320
                ? PhraseLists
                : <ScrollView>
                  {PhraseLists}
                </ScrollView>
              }
            </PhraseContainer>
          </KeyboardAwareScrollView>
        </TopContainer>
        <BottomContainer>
          <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
            <StepUI totalSteps={2} nowStep={1} />
            <View>
              <NextBtn onPress={() => {
                navigation.navigate('BackUpVerifyRecoveryPhrase')
              }} >{I18n.t('next')}</NextBtn>
            </View>
          </View>
        </BottomContainer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restorePhrase: state.giggle.restorePhrase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateVisiblePassword: (state, value) => dispatch(GiggleActions.updateVisiblePassword(state, value)),
    enableTouchId: (state, value) => dispatch(GiggleActions.enableTouchId(state, value)),
    walletPhrase: (avatarCode, password) => dispatch(GiggleActions.walletPhrase(avatarCode, password)),
    walletRecovery: (avatarCode, password, mnemonic) => dispatch(GiggleActions.walletRecovery(avatarCode, password, mnemonic))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPhrase)

const PhraseContainer = styled.View`
  margin-top: 24
  border-radius: 12
  background-color: #2b2b44
  flex-wrap: wrap
  width: ${Metrics.screenWidth > 320 ? 327 : 180}
  flex-direction:row; 
  height: ${props => props.height || 256}
  flex:1 
`

const TopContainer = styled.View`
  margin-left:24
  margin-right:24
  align-items:center  
  height:100%
  width: 100%
  flex: 1 
`

const BottomContainer = styled.View`
  height: 70
  padding-top:10
  width:100%
  align-items: flex-start
  padding-left:24  
  padding-right:24
`
