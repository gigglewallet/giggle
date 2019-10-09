import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { NextBtn } from '../Components/Buttons'
import { PhraseItem } from '../Components/TextFields'
import { ThreeStepUI } from '../Components/UI'
import { Colors, Fonts, Metrics } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { connect } from 'react-redux'
import GiggleActions from '../Redux/GiggleRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { is } from 'immutable'
class Restore extends Component {
  state = {
    switchAmount: 24,
    containerHeight: 500,
    isAgree: false,
    phrases: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    // phrases: 'appear caution owner absorb judge orange speed sleep worth design debris into ivory oven pulp paper saddle simple mom canyon price bike inflict style'.split(' ')
    // phrases: ['index', 'life', 'scrub', 'vast', 'mixture', 'early', 'night', 'gun', 'genius', 'fault', 'silk', 'couple', 'curious', 'dragon', 'stuff', 'mother', 'task', 'dynamic', 'meat', 'word', 'convince', 'park', 'waste', 'define']
    // simulator
    // phrases: 'index life scrub vast mixture early night gun genius fault silk couple curious dragon stuff mother task dynamic meat word convince park waste define'.split(' ')

    // real phone
    // phrases: 'hundred copper milk actress sight seminar board lava unveil perfect reopen diagram desert hand history edge room midnight short beach auto finish social quote'.split(' ')
  }

  componentDidMount = () => {
    const { is12Phrase } = this.props

    if (is12Phrase) {
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

  setPhrase = (idx, value) => {
    let { phrases, switchAmount } = this.state
    let flag = true
    phrases[idx] = value.toLowerCase()

    for (let i = 0; i < switchAmount; i++) {
      if (phrases[i].trim() === '') {
        flag = false
      }
    }

    this.setState({ phrases: phrases, isAgree: flag })
  }

  saveWalletPassword = () => {
    const { navigation, updateRestorePhrase } = this.props
    const { phrases } = this.state
    const phrase = phrases.join(' ').trim()
    updateRestorePhrase(phrase)
    navigation.navigate('ResetWalletPassword')
  }

  render () {
    let { phrases, isAgree, switchAmount, containerHeight } = this.state
    let PhraseLists = []

    for (let i = 0; i < switchAmount; i++) {
      PhraseLists.push(<PhraseItem key={i} number={i + 1} phrase={phrases[i]} idx={i} setState={this.setPhrase} />)
    }
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <View>
            <Text style={{ justifyContent: 'center', color: Colors.gary2, ...Fonts.style.h8 }}>{I18n.t('enterYourRecoveryPhrase')}</Text>
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
            <ThreeStepUI totalSteps={3} nowStep={1} />
            <NextBtn disabled={!isAgree} onPress={this.saveWalletPassword}>
              {I18n.t('next')}
            </NextBtn>
          </View>
        </BottomContainer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restorePhrase: state.giggle.restorePhrase,
    is12Phrase: state.walletStatus.is12Phrase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    walletPhrase: (avatarCode, password) => dispatch(GiggleActions.walletPhrase(avatarCode, password)),
    walletRecovery: (avatarCode, password, mnemonic) => dispatch(GiggleActions.walletRecovery(avatarCode, password, mnemonic)),
    updateRestorePhrase: (phrase) => dispatch(GiggleActions.updateRestorePhrase(phrase))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restore)

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
  padding-left:24
  padding-right:24
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
