import { takeLatest, all } from 'redux-saga/effects'
/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { GeneralTypes } from '../Redux/GeneralRedux'
import { GiggleTypes } from '../Redux/GiggleRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
/*
import {
  getGeneralInfo,
  getLaunchInfo,
  clearStorage
} from './GeneralSagas'
*/

import {
  test,
  walletInit,
  walletPhrase,
  walletRecovery,
  walletRestore,
  getBalance,
  getHeight,
  txCreateByFile,
  txReceiveByFile,
  txFinalize,
  txPost,
  txCancel,
  getAllTransactions,
  getTransactionDetail,
  getAllOutputs,
  cleanWallet,
  updateGiggleRequestStatusAction,
  restoreWallet,
  relayAddressQuery,
  sendTransaction,
  listen
} from './GiggleSagas'

export default function * root () {
  yield all([
    // takeLatest(GeneralTypes.GET_GENERAL_INFO, getGeneralInfo),
    // takeLatest(GeneralTypes.GET_LAUNCH_INFO, getLaunchInfo),
    // takeLatest(GeneralTypes.CLEAR_STORAGE, clearStorage),
    takeLatest(GiggleTypes.WALLET_RECOVERY, walletRecovery),
    takeLatest(GiggleTypes.WALLET_INIT, walletInit),
    takeLatest(GiggleTypes.WALLET_PHRASE, walletPhrase),
    takeLatest(GiggleTypes.WALLET_RESTORE, walletRestore),
    takeLatest(GiggleTypes.GET_BALANCE, getBalance),
    takeLatest(GiggleTypes.GET_HEIGHT, getHeight),
    takeLatest(GiggleTypes.TX_CREATE_BY_FILE, txCreateByFile),
    takeLatest(GiggleTypes.TX_RECEIVE_BY_FILE, txReceiveByFile),
    takeLatest(GiggleTypes.TX_FINALIZE, txFinalize),
    takeLatest(GiggleTypes.TX_POST, txPost),
    takeLatest(GiggleTypes.TX_CANCEL, txCancel),
    takeLatest(GiggleTypes.GET_ALL_TRANSACTIONS, getAllTransactions),
    takeLatest(GiggleTypes.GET_TRANSACTION_DETAIL, getTransactionDetail),
    takeLatest(GiggleTypes.GET_ALL_OUTPUTS, getAllOutputs),
    takeLatest(GiggleTypes.CLEAN_WALLET, cleanWallet),
    takeLatest(GiggleTypes.UPDATE_GIGGLE_REQUEST_STATUS_ACTION, updateGiggleRequestStatusAction),
    takeLatest(GiggleTypes.RESTORE_WALLET, restoreWallet),
    takeLatest(GiggleTypes.RELAY_ADDRESS_QUERY, relayAddressQuery),
    takeLatest(GiggleTypes.SEND_TRANSACTION, sendTransaction),
    takeLatest(GiggleTypes.LISTEN, listen),
    takeLatest(GiggleTypes.TEST1, test)
  ])
}
