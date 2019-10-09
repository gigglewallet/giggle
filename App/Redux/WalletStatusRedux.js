import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateWalletStatusRedux: ['key', 'value'],
  updateGiggleRequestStatus: ['actionType', 'isCalling', 'isSuccess', 'isFail'],
  updateGiggleRequestStatusAction: ['actionType', 'isCalling', 'isSuccess', 'isFail'],
  updateWalletRestorePercentage: ['percentage'],
  updateCreateWalletTermOne: ['checked'],
  updateCreateWalletTermTwo: ['checked'],
  updateIs12Phrase: ['checked'],
  agreeCreateWalletTerms: ['isAgree'],
  initWalletRedux: null
})

export const WalletStatusTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  homeRefreshing: false,
  tempPassword: null,
  tempPin: null,
  tempAvatarCode: null,

  isAvatarModalVisible: false,
  isCreateWalletTermOne: false,
  isCreateWalletTermTwo: false,
  isAgree: false,
  is12Phrase: true,

  isVerify: false,
  isPressedAskBtn: false,
  isEnoughBalance: true,
  isSendTransactionFail: false,
  isOnline: false,
  callingWalletRestore: false,
  successWalletRestore: false,
  failWalletRestore: false,
  lastRetrievedIndex: 0,
  txCreateFilePath: null,

  walletRestorePercentage: 0,
  relayAddress: null,

  isCallingWalletInit: false,
  isSuccessWalletInit: false,
  isFailWalletInit: false,

  isCallingWalletPhrase: false,
  isSuccessWalletPhrase: false,
  isFailWalletPhrase: false,

  isCallingWalletRecovery: false,
  isSuccessWalletRecovery: false,
  isFailWalletRecovery: false,

  isCallingWalletRestore: false,
  isSuccessWalletRestore: false,
  isFailWalletRestore: false,

  isCallingGetBalance: false,
  isSuccessGetBalance: false,
  isFailGetBalance: false,

  isCallingGetHeight: false,
  isSuccessGetHeight: false,
  isFailGetHeight: false,

  isCallingTxCreateByFile: false,
  isSuccessTxCreateByFile: false,
  isFailTxCreateByFile: false,

  isCallingTxReceiveByFile: false,
  isSuccessTxReceiveByFile: false,
  isFailTxReceiveByFile: false,

  isCallingTxFinalize: false,
  isSuccessTxFinalize: false,
  isFailTxFinalize: false,

  isCallingTxPost: false,
  isSuccessTxPost: false,
  isFailTxPost: false,

  isCallingTxCancel: false,
  isSuccessTxCancel: false,
  isFailTxCancel: false,

  isCallingGetAllTransactions: false,
  isSuccessGetAllTransactions: false,
  isFailGetAllTransactions: false,

  isCallingGetTransactionDetail: false,
  isSuccessGetTransactionDetail: false,
  isFailGetTransactionDetail: false,

  isCallingGetAllOutputs: false,
  isSuccessGetAllOutputs: false,
  isFailGetAllOutputs: false,

  isCallingCleanWallet: false,
  isSuccessCleanWallet: false,
  isFailCleanWallet: false,

  isCallingRelayAddressQuery: false,
  isSuccessRelayAddressQuery: false,
  isFailRelayAddressQuery: false,

  isCallingTxSend: false,
  isSuccessTxSend: false,
  isFailTxSend: false
})

/* ------------- Reducers ------------- */
export const initWalletRedux = (state) =>
  INITIAL_STATE

export const updateWalletStatusRedux = (state, { key, value }) => {
  console.log('updateWalletStatusRedux', key, value)
  let data = {}
  data[key] = value
  return state.merge(data)
}
export const updateWalletRestorePercentage = (state, { percentage }) => {
  return state.merge({ walletRestorePercentage: parseInt(percentage) })
}
export const updateCreateWalletTermOne = (state, action) => {
  const { checked } = action
  return state.merge({ isCreateWalletTermOne: checked })
}
export const updateCreateWalletTermTwo = (state, action) => {
  const { checked } = action
  return state.merge({ isCreateWalletTermTwo: checked })
}

export const updateIs12Phrase = (state, action) => {

  const { checked } = action
  console.log(checked)
  return state.merge({ is12Phrase: checked })
}

export const agreeCreateWalletTerms = (state, action) => {
  const { isAgree } = action
  return state.merge({ isAgree: isAgree })
}

export const updateGiggleRequestStatus = (state, action) => {
  const { actionType, isCalling, isSuccess, isFail } = action
  switch (actionType) {
    case 'walletInit':
      return state.merge({ isCallingWalletInit: isCalling, isSuccessWalletInit: isSuccess, isFailWalletInit: isFail })
    case 'walletPhrase':
      return state.merge({ isCallingWalletPhrase: isCalling, isSuccessWalletPhrase: isSuccess, isFailWalletPhrase: isFail })
    case 'walletRecovery':
      return state.merge({ isCallingWalletRecovery: isCalling, isSuccessWalletRecovery: isSuccess, isFailWalletRecovery: isFail })
    case 'walletRestore':
      return state.merge({ isCallingWalletRestore: isCalling, isSuccessWalletRestore: isSuccess, isFailWalletRestore: isFail })
    case 'getBalance':
      return state.merge({ isCallingGetBalance: isCalling, isSuccessGetBalance: isSuccess, isFailGetBalance: isFail })
    case 'getHeight':
      return state.merge({ isCallingGetHeight: isCalling, isSuccessGetHeight: isSuccess, isFailGetHeight: isFail })
    case 'txCreateByFile':
      return state.merge({ isCallingTxCreateByFile: isCalling, isSuccessTxCreateByFile: isSuccess, isFailTxCreateByFile: isFail })
    case 'txReceiveByFile':
      return state.merge({ isCallingTxReceiveByFile: isCalling, isSuccessTxReceiveByFile: isSuccess, isFailTxReceiveByFile: isFail })
    case 'txFinalize':
      return state.merge({ isCallingTxFinalize: isCalling, isSuccessTxFinalize: isSuccess, isFailTxFinalize: isFail })
    case 'txPost':
      return state.merge({ isCallingTxPost: isCalling, isSuccessTxPost: isSuccess, isFailTxPost: isFail })
    case 'txCancel':
      return state.merge({ isCallingTxCancel: isCalling, isSuccessTxCancel: isSuccess, isFailTxCancel: isFail })
    case 'getAllTransactions':
      return state.merge({ isCallingGetAllTransactions: isCalling, isSuccessGetAllTransactions: isSuccess, isFailGetAllTransactions: isFail })
    case 'getTransactionDetail':
      return state.merge({ isCallingGetTransactionDetail: isCalling, isSuccessGetTransactionDetail: isSuccess, isFailGetTransactionDetail: isFail })
    case 'getAllOutputs':
      return state.merge({ isCallingGetAllOutputs: isCalling, isSuccessGetAllOutputs: isSuccess, isFailGetAllOutputs: isFail })
    case 'cleanWallet':
      return state.merge({ isCallingCleanWallet: isCalling, isSuccessCleanWallet: isSuccess, isFailCleanWallet: isFail })
    case 'relayAddressQuery':
      return state.merge({ isCallingRelayAddressQuery: isCalling, isSuccessRelayAddressQuery: isSuccess, isFailRelayAddressQuery: isFail })
    case 'txSend':
      return state.merge({ isCallingTxSend: isCalling, isSuccessTxSend: isSuccess, isFailTxSend: isFail })
  }
}
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_WALLET_STATUS_REDUX]: updateWalletStatusRedux,
  [Types.UPDATE_GIGGLE_REQUEST_STATUS]: updateGiggleRequestStatus,
  [Types.UPDATE_WALLET_RESTORE_PERCENTAGE]: updateWalletRestorePercentage,
  [Types.UPDATE_CREATE_WALLET_TERM_ONE]: updateCreateWalletTermOne,
  [Types.UPDATE_CREATE_WALLET_TERM_TWO]: updateCreateWalletTermTwo,
  [Types.UPDATE_IS12_PHRASE]: updateIs12Phrase,
  [Types.AGREE_CREATE_WALLET_TERMS]: agreeCreateWalletTerms,
  [Types.INIT_WALLET_REDUX]: initWalletRedux

})
