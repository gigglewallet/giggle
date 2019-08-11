import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GeneralTypes } from '../Redux/GeneralRedux'
import { GiggleTypes } from '../Redux/GiggleRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import {
  getGeneralInfo,
  getLaunchInfo,
  clearStorage
} from './GeneralSagas'

import {
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
  restoreWallet
} from './GiggleSagas'
// console.log('xxxxx', GiggleTypes.WALLET_RECOVERY, walletRecovery)
/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root () {
  yield all([
    takeLatest(GeneralTypes.GET_GENERAL_INFO, getGeneralInfo, api),
    takeLatest(GeneralTypes.GET_LAUNCH_INFO, getLaunchInfo, api),
    takeLatest(GeneralTypes.CLEAR_STORAGE, clearStorage, api),
    takeLatest(GiggleTypes.WALLET_RECOVERY, walletRecovery, api),
    takeLatest(GiggleTypes.WALLET_INIT, walletInit, api),
    takeLatest(GiggleTypes.WALLET_PHRASE, walletPhrase, api),
    takeLatest(GiggleTypes.WALLET_RESTORE, walletRestore, api),
    takeLatest(GiggleTypes.GET_BALANCE, getBalance, api),
    takeLatest(GiggleTypes.GET_HEIGHT, getHeight, api),
    takeLatest(GiggleTypes.TX_CREATE_BY_FILE, txCreateByFile, api),
    takeLatest(GiggleTypes.TX_RECEIVE_BY_FILE, txReceiveByFile, api),
    takeLatest(GiggleTypes.TX_FINALIZE, txFinalize, api),
    takeLatest(GiggleTypes.TX_POST, txPost, api),
    takeLatest(GiggleTypes.TX_CANCEL, txCancel, api),
    takeLatest(GiggleTypes.GET_ALL_TRANSACTIONS, getAllTransactions, api),
    takeLatest(GiggleTypes.GET_TRANSACTION_DETAIL, getTransactionDetail, api),
    takeLatest(GiggleTypes.GET_ALL_OUTPUTS, getAllOutputs, api),
    takeLatest(GiggleTypes.CLEAN_WALLET, cleanWallet, api),
    takeLatest(GiggleTypes.UPDATE_GIGGLE_REQUEST_STATUS_ACTION, updateGiggleRequestStatusAction, api),
    takeLatest(GiggleTypes.RESTORE_WALLET, restoreWallet, api)
  ])
}
