import React, { Component } from 'react'
import { View, StatusBar, AppState } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './Styles/RootContainerStyles'
import { Colors, Fonts } from '../Themes/index'
import Toast from 'react-native-easy-toast'
import GiggleActions from '../Redux/GiggleRedux'
import { CircularProgress } from '../Components/CircularProgress'
import I18n from 'react-native-i18n'
import { Loading, EasyLoading } from 'react-native-easy-loading'
import WalletStatusActions from '../Redux/WalletStatusRedux'
const LENGTH_LONG = 2000
class RootContainer extends Component {
  state = {
    appState: AppState.currentState
  }
  componentDidMount () {
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.props.listen()
    }
    this.setState({ appState: nextAppState })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.isFailGetBalance !== this.props.isFailGetBalance && nextProps.isFailGetBalance === true) {
      this.refs.toast.show('Get baalance fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('getBalance', false, false, false)
      })
    }

    if (nextProps.isFailWalletInit !== this.props.isFailWalletInit && nextProps.isFailWalletInit === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('walletInit', false, false, false)
      })
    }

    if (nextProps.isFailWalletPhrase !== this.props.isFailWalletPhrase && nextProps.isFailWalletPhrase === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('walletPhrase', false, false, false)
      })
    }

    if (nextProps.isFailWalletRecovery !== this.props.isFailWalletRecovery && nextProps.isFailWalletRecovery === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('walletRecovery', false, false, false)
      })
    }

    if (nextProps.isFailWalletRestore !== this.props.isFailWalletRestore && nextProps.isFailWalletRestore === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('walletRestore', false, false, false)
      })
    }

    if (nextProps.isFailGetBalance !== this.props.isFailGetBalance && nextProps.isFailGetBalance === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('getBalance', false, false, false)
      })
    }

    if (nextProps.isFailGetHeight !== this.props.isFailGetHeight && nextProps.isFailGetHeight === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('getHeight', false, false, false)
      })
    }

    if (nextProps.isFailTxCreateByFile !== this.props.isFailTxCreateByFile && nextProps.isFailTxCreateByFile === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('txCreateByFile', false, false, false)
      })
    }

    if (nextProps.isFailTxReceiveByFile !== this.props.isFailTxReceiveByFile && nextProps.isFailTxReceiveByFile === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('txReceiveByFile', false, false, false)
      })
    }

    if (nextProps.isFailTxFinalize !== this.props.isFailTxFinalize && nextProps.isFailTxFinalize === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('txFinalize', false, false, false)
      })
    }

    if (nextProps.isFailTxPost !== this.props.isFailTxPost && nextProps.isFailTxPost === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('txPost', false, false, false)
      })
    }

    if (nextProps.isFailTxCancel !== this.props.isFailTxCancel && nextProps.isFailTxCancel === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('txCancel', false, false, false)
      })
    }

    if (nextProps.isFailGetAllTransactions !== this.props.isFailGetAllTransactions && nextProps.isFailGetAllTransactions === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('getAllTransactions', false, false, false)
      })
    }

    if (nextProps.isFailGetTransactionDetail !== this.props.isFailGetTransactionDetail && nextProps.isFailGetTransactionDetail === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('getTransactionDetail', false, false, false)
      })
    }

    if (nextProps.isFailGetAllOutputs !== this.props.isFailGetAllOutputs && nextProps.isFailGetAllOutputs === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('getAllOutputs', false, false, false)
      })
    }

    if (nextProps.isFailCleanWallet !== this.props.isFailCleanWallet && nextProps.isFailCleanWallet === true) {
      this.refs.toast.show('fail', LENGTH_LONG, () => {
        this.props.updateGiggleRequestStatusAction('cleanWallet', false, false, false)
      })
    }

    if (nextProps.isFailRelayAddressQuery !== this.props.isFailRelayAddressQuery && nextProps.isFailRelayAddressQuery === true) {
      this.refs.toast.show(I18n.t('theUserIsNotOnline'),
        LENGTH_LONG, () => {
          this.props.updateGiggleRequestStatusAction('relayAddressQuery', false, false, false)
        })
    }
    if (nextProps.isPressedAskBtn !== this.props.isPressedAskBtn && nextProps.isPressedAskBtn) {
      this.refs.toast.show('Coming soon', LENGTH_LONG)
    }
    if (nextProps.isEnoughBalance !== this.props.isEnoughBalance && !nextProps.isEnoughBalance) {
      this.refs.toast.show('The balance is not enough', LENGTH_LONG)
      this.props.updateWalletStatusRedux('isEnoughBalance', true)
    }

    if (nextProps.isSendTransactionFail !== this.props.isSendTransactionFail && nextProps.isSendTransactionFail) {
      this.refs.toast.show('Transaction failed', LENGTH_LONG)
      this.props.updateWalletStatusRedux('isSendTransactionFail', false)
    }

    if (nextProps.isCallingRelayAddressQuery !== this.props.isCallingRelayAddressQuery && nextProps.isCallingRelayAddressQuery === true) {
      EasyLoading.show('Loading...')
    }
    if (nextProps.isCallingRelayAddressQuery !== this.props.isCallingRelayAddressQuery && nextProps.isCallingRelayAddressQuery === false) {
      EasyLoading.dismis()
    }

    if (nextProps.isCallingTxSend !== this.props.isCallingTxSend && nextProps.isCallingTxSend === true) {
      EasyLoading.show('Processing...')
    }
    if (nextProps.isCallingTxSend !== this.props.isCallingTxSend && nextProps.isCallingTxSend === false) {
      EasyLoading.dismis()
    }
  }

  render () {
    const {
      isCallingGetBalance,
      isCallingWalletPhrase,
      isCallingWalletRecovery,
      isCallingWalletRestore,
      isCallingGetHeight,
      isCallingTxCreateByFile,
      isCallingTxReceiveByFile,
      isCallingTxFinalize,
      isCallingTxPost,
      isCallingTxCancel,
      isCallingGetAllTransactions,
      isCallingGetTransactionDetail,
      isCallingGetAllOutputs,
      isCallingCleanWallet,
      walletRestorePercentage
    } = this.props
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <Loading />
        <Toast ref='toast' style={{ backgroundColor: Colors.toast }} />
        {!isCallingWalletRestore ? null : <CircularProgress percentage={walletRestorePercentage} />}
        <Spinner
          visible={
            isCallingGetBalance || isCallingWalletPhrase || isCallingWalletRecovery || isCallingWalletRestore ||
            isCallingGetHeight || isCallingTxCreateByFile || isCallingTxReceiveByFile || isCallingTxFinalize ||
            isCallingTxPost || isCallingTxCancel | isCallingGetAllTransactions || isCallingGetTransactionDetail ||
            isCallingGetAllOutputs || isCallingCleanWallet
          }
          textContent={'Processing...'}
          textStyle={{ color: Colors.text, ...Fonts.style.h7 }}
        />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    isCallingWalletInit: state.giggle.isCallingWalletInit,
    isCallingWalletPhrase: state.giggle.isCallingWalletPhrase,
    isCallingWalletRecovery: state.giggle.isCallingWalletRecovery,
    isCallingWalletRestore: state.giggle.isCallingWalletRestore,
    isCallingGetBalance: state.giggle.isCallingGetBalance,
    isCallingGetHeight: state.giggle.isCallingGetHeight,
    isCallingTxCreateByFile: state.giggle.isCallingTxCreateByFile,
    isCallingTxReceiveByFile: state.giggle.isCallingTxReceiveByFile,
    isCallingTxFinalize: state.giggle.isCallingTxFinalize,
    isCallingTxPost: state.giggle.isCallingTxPost,
    isCallingTxCancel: state.giggle.isCallingTxCancel,
    isCallingGetAllTransactions: state.giggle.isCallingGetAllTransactions,
    isCallingGetTransactionDetail: state.giggle.isCallingGetTransactionDetail,
    isCallingGetAllOutputs: state.giggle.isCallingGetAllOutputs,
    isCallingCleanWallet: state.giggle.isCallingCleanWallet,

    isFailWalletInit: state.giggle.isFailWalletInit,
    isFailWalletPhrase: state.giggle.isFailWalletPhrase,
    isFailWalletRecovery: state.giggle.isFailWalletRecovery,
    isFailWalletRestore: state.giggle.isFailWalletRestore,
    isFailGetBalance: state.giggle.isFailGetBalance,
    isFailGetHeight: state.giggle.isFailGetHeight,
    isFailTxCreateByFile: state.giggle.isFailTxCreateByFile,
    isFailTxReceiveByFile: state.giggle.isFailTxReceiveByFile,
    isFailTxFinalize: state.giggle.isFailTxFinalize,
    isFailTxPost: state.giggle.isFailTxPost,
    isFailTxCancel: state.giggle.isFailTxCancel,
    isFailGetAllTransactions: state.giggle.isFailGetAllTransactions,
    isFailGetTransactionDetail: state.giggle.isFailGetTransactionDetail,
    isFailGetAllOutputs: state.giggle.isFailGetAllOutputs,
    isFailCleanWallet: state.giggle.isFailCleanWallet,

    walletRestorePercentage: state.giggle.walletRestorePercentage,
    isFailRelayAddressQuery: state.giggle.isFailRelayAddressQuery,
    isCallingRelayAddressQuery: state.giggle.isCallingRelayAddressQuery,
    isPressedAskBtn: state.walletStatus.isPressedAskBtn,
    isEnoughBalance: state.walletStatus.isEnoughBalance,
    isSendTransactionFail: state.walletStatus.isSendTransactionFail,
    isCallingTxSend: state.giggle.isCallingTxSend
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  updateGiggleRequestStatusAction: (actionType, isCalling, isSuccess, isFail) => dispatch(GiggleActions.updateGiggleRequestStatusAction(actionType, isCalling, isSuccess, isFail)),
  updateWalletStatusRedux: (key, value) => dispatch(WalletStatusActions.updateWalletStatusRedux(key, value)),
  listen: () => dispatch(GiggleActions.listen())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
