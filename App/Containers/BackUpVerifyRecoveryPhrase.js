import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { KeywordBtn, SmallBtn } from '../Components/Buttons'
import { VerifyPhraseItem } from '../Components/TextFields'
import { StepUI } from '../Components/UI'
import { Colors, Fonts } from '../Themes'
import styled from 'styled-components/native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import styles from './Styles/LaunchScreenStyles'
import GiggleActions from '../Redux/GiggleRedux'
class VerifyRecoveryPhrase extends Component {
  constructor (props) {
    super(props)
    this.state = { focusIndex: 1, verifyInput1: '', verifyInput2: '', verifyInput3: '', isCorrect: true }
    this.private = {}
    this.private.phraseLists = []
    this.private.randomIndex = []
    this.private.verifyKey1Index = 0
    this.private.verifyKey2Index = 0
    this.private.verifyKey3Index = 0
    this.private.keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].sort(() => Math.random() - 0.5)
  }

  getRandomNumber = () => {
    let newIndexs = [...this.private.keys]
    newIndexs.length = 12
    newIndexs.sort(() => Math.random() - 0.5)
    newIndexs.length = 3
    this.private.verifyKey1Index = newIndexs[0]
    this.private.verifyKey2Index = newIndexs[1]
    this.private.verifyKey3Index = newIndexs[2]
  }
  onPressKeywordBtn = (item) => {
    if (this.state.focusIndex >= 4) return
    if (item !== this.props.restorePhrase[this.private['verifyKey' + this.state.focusIndex + 'Index']]) {
      let data = { isCorrect: false }
      data['verifyInput' + this.state.focusIndex] = item
      this.setState(data)
      return
    }
    let data = { isCorrect: true }
    data['verifyInput' + this.state.focusIndex] = item
    data.focusIndex = this.state.focusIndex + 1
    this.setState(data)
  }
  clearAll = () => {
    this.setState({ focusIndex: 1, verifyInput1: '', verifyInput2: '', verifyInput3: '', isCorrect: true })
  }
  componentWillMount () {
    const { restorePhrase } = this.props
    for (let i = 0; i < 12; i++) {
      this.private.phraseLists.push(restorePhrase[[this.private.keys[i]]])
    }
    this.getRandomNumber()
  }
  onPress = () => {
    const { navigation, updateGiggleRedux } = this.props
    navigation.navigate('BackUpFinish')
    updateGiggleRedux('isBackupPhrase', true)
  }
  render () {
    const { navigation } = this.props
    const { verifyInput1, verifyInput2, verifyInput3 } = this.state
    return (
      <View style={styles.mainContainer} >
        <TopContainer>
          <View>
            <VerifyPhraseItem number={this.private.verifyKey1Index + 1} focus={this.state.focusIndex === 1} value={verifyInput1} />
            <VerifyPhraseItem number={this.private.verifyKey2Index + 1} focus={this.state.focusIndex === 2} value={verifyInput2} />
            <VerifyPhraseItem number={this.private.verifyKey3Index + 1} focus={this.state.focusIndex === 3} value={verifyInput3} />
          </View>
          {this.state.isCorrect ? null
            : <View>
              <Text style={{ color: Colors.waringOrange, ...Fonts.style.h9 }}>
                {I18n.t('recoverPhraseDoesNotMatch')}
              </Text>
            </View>

          }
          <View style={{ display: 'flex', width: 327, marginTop: 24, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: Colors.gary2, ...Fonts.style.h8 }}>
              {I18n.t('selectTheCorrectWord')}
            </Text>
            <TouchableOpacity onPress={this.clearAll} >
              <Text style={{ color: Colors.darkText, ...Fonts.style.h9 }}>
                {I18n.t('clearAll')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexWrap: 'wrap', marginTop: 24, flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
            {this.private.phraseLists.map((item, index) =>
              <KeywordBtn onPress={this.onPressKeywordBtn.bind(this, item)}>{item}</KeywordBtn>
            )}
          </View>
        </TopContainer>
        <BottomContainer>
          <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
            <StepUI totalSteps={2} nowStep={2} />
            <View>
              {this.state.focusIndex !== 4
                ? <SmallBtn
                  borderColor='rgba(120,120,240,0.1)'
                  fontColor='rgba(255,255,255,0.5)'
                  activeOpacity={0.6}
                  bgColor={'rgba(120,120,240,0.5)'}
                >
                  {I18n.t('verify')}
                </SmallBtn>
                : <SmallBtn
                  borderColor='rgba(120,120,240,1)'
                  fontColor='rgba(255,255,255,1)'
                  activeOpacity={0.1}
                  bgColor='rgba(120,120,240,1)'
                  onPress={this.onPress}
                >
                  {I18n.t('verify')}
                </SmallBtn>
              }
            </View>
          </View>
        </BottomContainer>
      </View >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    restorePhrase: state.giggle.restorePhrase
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateGiggleRedux: (key, value) => dispatch(GiggleActions.updateGiggleRedux(key, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyRecoveryPhrase)

const TopContainer = styled.View`
  margin-left:24
  margin-right:24
  align-items:center  
  flex: 1 
`

const BottomContainer = styled.View`
  height: 60
  width:100%
  justify-content:flex-start
  padding-left:24  
  padding-right:24
`
