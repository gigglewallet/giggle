import { takeLatest, all } from 'redux-saga/effects'
/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GiggleTypes } from '../Redux/GiggleRedux'
import { WalletStatusTypes } from '../Redux/WalletStatusRedux'
import { GeneralTypes } from '../Redux/GeneralRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'

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
  restoreWallet,
  relayAddressQuery,
  sendTransaction,
  listen,
  getNewAvatar,
  setCurrentWallet,
  setNewContact,
  removeWalletData,
  logout,
  checkFaceId,
  updateTransaction
} from './GiggleSagas'

import {
  updateGiggleRequestStatusAction
} from './WalletStatusSagas'

import {
  clearStorage
} from './GeneralSagas'

export default function* root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
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
    takeLatest(GiggleTypes.RESTORE_WALLET, restoreWallet),
    takeLatest(GiggleTypes.RELAY_ADDRESS_QUERY, relayAddressQuery),
    takeLatest(GiggleTypes.SEND_TRANSACTION, sendTransaction),
    takeLatest(GiggleTypes.LISTEN, listen),
    takeLatest(GiggleTypes.UPDATE_TRANSACTION, updateTransaction),
    takeLatest(GiggleTypes.GET_NEW_AVATAR, getNewAvatar),
    takeLatest(GiggleTypes.SET_CURRENT_WALLET, setCurrentWallet),
    takeLatest(GiggleTypes.SET_NEW_CONTACT, setNewContact),
    takeLatest(GiggleTypes.REMOVE_WALLET_DATA, removeWalletData),
    takeLatest(GiggleTypes.LOGOUT, logout),
    takeLatest(GiggleTypes.CHECK_FACE_ID, checkFaceId),
    takeLatest(GeneralTypes.CLEAR_STORAGE, clearStorage),
    takeLatest(WalletStatusTypes.UPDATE_GIGGLE_REQUEST_STATUS_ACTION, updateGiggleRequestStatusAction)
  ])
}
