import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { LightBtn, DarkBtn, PhraseItem } from '../Components/Buttons'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/SignUpStyles'
import { connect } from 'react-redux'
import WalletsStatusRedux from '../Redux/WalletStatusRedux'
import GiggleActions from '../Redux/GiggleRedux'


class SignUp extends Component {

  componentDidMount = () => {
    const { currentWallet } = this.props

    console.log(currentWallet)
    
  }

  render () {
    const { navigation, is12Phrase, updateIs12Phrase } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={require('../Images/Assets/ic_logo_96px.png')} />
        </View>
        <View style={styles.bottomContainer}>
          <PhraseItem checkEvt={updateIs12Phrase} CheckState={is12Phrase} item={'Use 24-word Phrase. (Default is 12-word Phrase)'} />
          <LightBtn onPress={() => {
            navigation.navigate('CreateNewWallet')
          }}>
            {I18n.t('createNewWallet')}
          </LightBtn>
          <DarkBtn onPress={function () {
            navigation.navigate('Restore')
          }}>
            {I18n.t('restoreWithRecoveryPhrase')}
          </DarkBtn>
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  
  return {
    // ...redux state to props here    
    is12Phrase: state.walletStatus.is12Phrase,
    currentWallet: state.giggle.currentWallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateIs12Phrase: (state, value) => dispatch(WalletsStatusRedux.updateIs12Phrase(state, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

