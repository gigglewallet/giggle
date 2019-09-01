import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { TRANSACTION_TYPE } from '../Modules/CommonType'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  walletInit: ['avatarCode', 'password', 'is12Phrase'],
  walletPhrase: ['avatarCode', 'password'],
  walletRecovery: ['avatarCode', 'password', 'mnemonic'],
  walletRestore: ['avatarCode', 'password'],
  getBalance: ['avatarCode', 'password'],
  getHeight: ['avatarCode', 'password'],
  txCreateByFile: ['avatarCode', 'password', 'amount', 'strategy', 'message', 'version'],
  txReceiveByFile: ['avatarCode', 'password', 'filePath', 'message'],
  txFinalize: ['avatarCode', 'password', 'filePath'],
  txPost: ['avatarCode', 'password', 'slateId'],
  txCancel: ['avatarCode', 'password', 'slateId'],
  txSend: ['avatarCode', 'password', 'price', 'note', 'url'],
  listen: null,
  getAllTransactions: ['avatarCode', 'password'],
  getTransactionDetail: ['avatarCode', 'password', 'slateId'],
  // txGet
  getAllOutputs: ['avatarCode', 'password'],
  cleanWallet: ['avatarCode', 'password', 'path'],
  updateGiggleRequestStatus: ['actionType', 'isCalling', 'isSuccess', 'isFail'],
  updateGiggleRequestStatusAction: ['actionType', 'isCalling', 'isSuccess', 'isFail'],
  updateWalletRestorePercentage: ['percentage'],
  test1: null,
  test2: null,
  test3: null,
  test4: null,
  restoreWallet: ['avatarCode', 'password', 'mnemonic'],
  updateCreateWalletTermOne: ['checked'],
  updateCreateWalletTermTwo: ['checked'],
  agreeCreateWalletTerms: ['isAgree'],
  updateVisiblePassword: ['enable'],
  enableTouchId: ['enable'],
  enablePinTouchId: ['enable'],
  setWalletPassword: ['password'],
  updateWalletPasswordByIndex: ['index', 'password'],
  updateWalletAvatarCodeByIndex: ['index', 'avatarCode'],
  updateWalletBalanceByIndex: ['index', 'balance'],
  updateGiggleRedux: ['key', 'value'],
  updateRestorePhrase: ['phrase'],
  relayAddressQuery: ['targetAvatarCode'],
  sendTransaction: ['info'],
  addTransactionHistory: ['info']
})

export const GiggleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // wallets: [{ avatarCode: 'xxxxxx', walletName: 'wallet_1', password: '1111', balance: 0 }],
  // wallets: [{ avatarCode: 'ydgs9l', walletName: 'wallet_1', password: '1111', balance: 0 }],
  wallets: [{ avatarCode: 'ydgs9l', walletName: 'wallet_1', password: '11', balance: 0 }],
  contacts: [{ avatarCode: '85s8zd', nickname: 'Terrence' },
  { avatarCode: 'S2T98Z', nickname: 'Ryan' },
  { avatarCode: '9A131K', nickname: 'Morphy' },
  { avatarCode: 'M8109E', nickname: 'Louise' },
  { avatarCode: 'B7009P', nickname: 'Nelson' }],
  transactionHistory: [
    { type: TRANSACTION_TYPE.Sending, amount: 25.17194374, date: 1502692997848, source: 'Noah。 6539QW', avatarCode: '6539QW', nickname: 'Noah', notes: 'this is notes 1' },
    { type: TRANSACTION_TYPE.SendSuccess, amount: 1.17194374, date: 1562002997848, source: 'Ryan。 6539QW', avatarCode: '52T98Z', nickname: 'Ryan', notes: 'this is notes 2' },
    { type: TRANSACTION_TYPE.SendFail, amount: 250.17194374, date: 1562202997848, source: 'Morphny。 6539QW', avatarCode: '9A131K', nickname: 'Morphy', notes: 'this is notes 3' },
    { type: TRANSACTION_TYPE.Asking, amount: 28.17194374, date: 1562612907848, source: 'Gary。 6539QW', avatarCode: 'MB109E', nickname: 'Louisej', notes: 'this is notes 4' },
    { type: TRANSACTION_TYPE.AskSuccess, amount: 20.17194374, date: 1562693997848, source: 'Louise。 6539QW', avatarCode: '87009p', nickname: 'Nelson', notes: 'this is notes 5' },
    { type: TRANSACTION_TYPE.AskFail, amount: 215.17194374, date: 1562698997848, source: 'Noah。 6539QW', avatarCode: 'X83D83', nickname: 'Terrence', notes: 'this is notes 6' }
  ],
  restorePhrase: '',
  isEnableWallet: true,
  isBackupPhrase: false,
  isOnline: false,
  callingWalletRestore: false,
  successWalletRestore: false,
  failWalletRestore: false,
  highestIndex: 1,
  lastRetrievedIndex: 0,
  height: null,
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
  isFailTxSend: false,

  isCreateWalletTermOne: false,
  isCreateWalletTermTwo: false,
  isAgree: false,
  isVisiblePassword: false,
  isEnableTouchId: false,
  isEnablePinTouchId: false
})

/* ------------- Reducers ------------- */

export const generalInfoRequest = (state) =>
  state.merge({ fetchingGeneralInfo: true })

export const generalInfoSuccess = (state, action) => {
  const { generalInfo } = action
  return state.merge({ fetchingGeneralInfo: false, errorGeneraalInfo: null, generalInfo })
}

export const generalInfoFailure = (state) =>
  state.merge({ fetchingGeneralInfo: false, errorGeneraalInfo: true })

export const launchInfoRequest = (state) =>
  state.merge({ fetchingLaunchInfo: true })

export const launchInfoSuccess = (state, action) => {
  const { launchInfo } = action
  return state.merge({ fetchingLaunchInfo: false, errorLaunfhInfo: null, launchInfo })
}

export const launchInfoFailure = (state) =>
  state.merge({ fetchingLaunchInfo: false, errorLaunfhInfo: true })

export const updateWalletRestorePercentage = (state, { percentage }) => {
  return state.merge({ walletRestorePercentage: parseInt(percentage) })
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

/* sign up & create wallet */
export const updateCreateWalletTermOne = (state, action) => {
  const { checked } = action
  return state.merge({ isCreateWalletTermOne: checked })
}

export const updateCreateWalletTermTwo = (state, action) => {
  const { checked } = action
  return state.merge({ isCreateWalletTermTwo: checked })
}

export const agreeCreateWalletTerms = (state, action) => {
  const { isAgree } = action
  return state.merge({ isAgree: isAgree })
}

export const updateVisiblePassword = (state, action) => {
  const { enable } = action
  return state.merge({ isVisiblePassword: enable })
}

export const enableTouchId = (state, action) => {
  const { enable } = action
  return state.merge({ isEnableTouchId: enable })
}

export const enablePinTouchId = (state, action) => {
  const { enable } = action
  return state.merge({ isEnablePinTouchId: enable })
}

export const updateWalletPasswordByIndex = (state, { index, password }) => {
  const wallets = Immutable.asMutable(state.wallets)
  const wallet = Immutable.asMutable(wallets[index])
  wallets[index] = wallet
  wallet.password = password
  wallets[index] = wallet
  return state.merge({ wallets })
}

export const updateWalletAvatarCodeByIndex = (state, { index, avatarCode }) => {
  const wallets = Immutable.asMutable(state.wallets)
  const wallet = Immutable.asMutable(wallets[index])
  wallets[index] = wallet
  wallet.avatarCode = avatarCode
  wallets[index] = wallet
  return state.merge({ wallets })
}

export const updateWalletBalanceByIndex = (state, { index, balance }) => {
  console.log('updateWalletBalanceByIndex:', index, balance)
  const wallets = Immutable.asMutable(state.wallets)
  const wallet = Immutable.asMutable(wallets[index])
  wallets[index] = wallet
  wallet.balance = balance
  wallets[index] = wallet
  return state.merge({ wallets })
}
export const updateGiggleRedux = (state, { key, value }) => {
  let data = {}
  data[key] = value
  console.log(data)
  return state.merge(data)
}

export const updateRestorePhrase = (state, { phrase }) => {
  const phrases = phrase.split(' ')
  return state.merge({ restorePhrase: phrases })
}

export const addTransactionHistory = (state, { info }) => {
  console.log('call addTransactionHistory ')
  let transactionHistory = Immutable.asMutable(state.transactionHistory)
  transactionHistory.unshift(info)
  return state.merge({ transactionHistory })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_GIGGLE_REQUEST_STATUS]: updateGiggleRequestStatus,
  [Types.UPDATE_WALLET_RESTORE_PERCENTAGE]: updateWalletRestorePercentage,
  [Types.UPDATE_CREATE_WALLET_TERM_ONE]: updateCreateWalletTermOne,
  [Types.UPDATE_CREATE_WALLET_TERM_TWO]: updateCreateWalletTermTwo,
  [Types.AGREE_CREATE_WALLET_TERMS]: agreeCreateWalletTerms,
  [Types.UPDATE_VISIBLE_PASSWORD]: updateVisiblePassword,
  [Types.ENABLE_TOUCH_ID]: enableTouchId,
  [Types.ENABLE_PIN_TOUCH_ID]: enablePinTouchId,
  [Types.UPDATE_WALLET_PASSWORD_BY_INDEX]: updateWalletPasswordByIndex,
  [Types.UPDATE_WALLET_AVATAR_CODE_BY_INDEX]: updateWalletAvatarCodeByIndex,
  [Types.UPDATE_WALLET_BALANCE_BY_INDEX]: updateWalletBalanceByIndex,
  [Types.UPDATE_GIGGLE_REDUX]: updateGiggleRedux,
  [Types.UPDATE_RESTORE_PHRASE]: updateRestorePhrase,
  [Types.ADD_TRANSACTION_HISTORY]: addTransactionHistory
})
