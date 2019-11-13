import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { TRANSACTION_TYPE } from '../Modules/CommonType'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  walletInit: ['avatarCode', 'password', 'is12Phrase'],
  walletPhrase: ['avatarCode', 'password'],
  walletRecovery: ['avatarCode', 'password', 'mnemonic'],
  walletRestore: ['avatarCode', 'password'],
  getBalance: ['avatarCode', 'password', 'isProcessLoading'],
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
  checkFaceId: null,
  removeWalletData: null,
  logout: null,
  restoreWallet: [],
  updateVisiblePassword: ['enable'],
  enableTouchId: ['enable'],
  enablePinTouchId: ['enable'],
  setWalletPassword: ['password'],
  updateWalletPasswordByIndex: ['index', 'password'],
  updateWalletAvatarCodeByIndex: ['index', 'avatarCode'],
  updateWalletBalanceByIndex: ['index', 'balance'],
  updateGiggleRedux: ['key', 'value'],
  updateRestorePhrase: ['phrase'],
  relayAddressQuery: ['targetAvatarCode', 'callback'],
  addContact: ['avatarCode', 'nickname', 'method'],
  setNewContact: ['avatarCode', 'nickname', 'method'],
  delContact: ['avatarCode'],
  updateContact: ['avatarCode', 'nickname'],
  sendTransaction: ['info'],
  addTransactionHistory: ['info'],
  updateGrinrelayAddressIndex: ['index'],
  getNewAvatar: null,
  setCurrentWallet: ['wallet'],
  addNewWallet: ['wallet'],
  updateCurrentWallet: ['wallet'],
  initGiggleRedux: null,
  addErrorLog: ['error'],
  updateTransaction: null,
  clearTransaction: null,
  updateTransactionConfirmed: ['id', 'status']
})

export const GiggleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  wallets: [],
  currentWallet: {},
  contacts: [],
  isEnableWallet: false,
  transactionHistory: [],
  grinrelayReceivingAddressIndex: 0,
  bestNodeApiAddress: null,
  relayAddressIndex: 0,
  restorePhrase: '',
  isBackupPhrase: false,
  highestIndex: 1,
  height: null,
  isVisiblePassword: true,
  isEnableTouchId: false,
  isEnablePinTouchId: false,
  errorList: []
})

/* ------------- Reducers ------------- */
export const initGiggleRedux = (state) =>
  INITIAL_STATE

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

export const addNewWallet = (state, { wallet }) => {
  const wallets = Immutable.asMutable(state.wallets)
  wallets.push(wallet)
  return state.merge({ wallets })
}

export const updateCurrentWallet = (state, { wallet }) => {
  const currentWallet = Immutable.asMutable(state.currentWallet)
  if (wallet.walletName) currentWallet.walletName = wallet.walletName
  if (wallet.avatarCode) currentWallet.avatarCode = wallet.avatarCode
  if (wallet.password) currentWallet.password = wallet.password
  if (wallet.balance || wallet.balance === 0) {
    console.log('in call updateCurrentWallet', wallet, ', currentWallet=', currentWallet)
    currentWallet.balance = wallet.balance
  }
  console.log('call updateCurrentWallet', wallet.balance, wallet, ', currentWallet=', currentWallet)
  return state.merge({ currentWallet: currentWallet })
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
  console.log(data, 'key=', key, 'value=', value)
  return state.merge(data)
}

export const updateRestorePhrase = (state, { phrase }) => {
  const phrases = phrase.split(' ')
  return state.merge({ restorePhrase: phrases })
}

export const addContact = (state, { avatarCode, nickname, method }) => {
  const newContact = { avatarCode: avatarCode, nickname: nickname, method: method }
  const contacts = Immutable.asMutable(state.contacts)
  const nextState = [...contacts, newContact]

  return state.merge({ contacts: nextState })
}

export const delContact = (state, { avatarCode }) => {
  const contacts = Immutable.asMutable(state.contacts)
  const filtered = contacts.filter(function (avatar) {
    return avatar.avatarCode !== avatarCode
  })
  return state.merge({ contacts: filtered })
}

export const updateContact = (state, { avatarCode, nickname }) => {
  const contacts = Immutable.asMutable(state.contacts)
  const idx = contacts.findIndex(avatar => avatar.avatarCode === avatarCode)
  const contact = Immutable.asMutable(contacts[idx])
  contact.nickname = nickname
  contacts[idx] = contact

  return state.merge({ contacts })
}

export const addTransactionHistory = (state, { info }) => {
  console.log('call addTransactionHistory ')
  let transactionHistory = Immutable.asMutable(state.transactionHistory)
  transactionHistory.unshift(info)
  return state.merge({ transactionHistory })
}

export const updateGrinrelayAddressIndex = (state, { index }) => {
  // grinrelay_receiving_address_index

  return state.merge({ relayAddressIndex: index.index })
}

export const addErrorLog = (state, { error }) => {
  console.log('call addErrorLog', error)
  let errorList = Immutable.asMutable((state.errorList) ? state.errorList : [])
  errorList.unshift(error)
  return state.merge({ errorList })
}

export const clearTransaction = (state) => {
  /*
  let result = state.transactionHistory.filter((value, index) => {
    console.log(value, index)
    if (value && value.type !== 5) return value
  })
  console.log(result)
  return state.merge({ transactionHistory: result })
  */
  return state
}

export const updateTransactionConfirmed = (state, { id, status }) => {
  console.log('call updateTransactionConfirmed id ', id, ', type=', status)
  let result = state.transactionHistory.map((value, index) => {
    if (value.id === id) {
      if (status === TRANSACTION_TYPE.Asking) return { ...value, type: TRANSACTION_TYPE.AskSuccess }
      else if (status === TRANSACTION_TYPE.Sending) return { ...value, type: TRANSACTION_TYPE.SendSuccess }
    }
    return value
  })
  return state.merge({ transactionHistory: result })
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  [Types.UPDATE_VISIBLE_PASSWORD]: updateVisiblePassword,
  [Types.ENABLE_TOUCH_ID]: enableTouchId,
  [Types.ENABLE_PIN_TOUCH_ID]: enablePinTouchId,
  [Types.UPDATE_WALLET_PASSWORD_BY_INDEX]: updateWalletPasswordByIndex,
  [Types.UPDATE_WALLET_AVATAR_CODE_BY_INDEX]: updateWalletAvatarCodeByIndex,
  [Types.UPDATE_WALLET_BALANCE_BY_INDEX]: updateWalletBalanceByIndex,
  [Types.UPDATE_GIGGLE_REDUX]: updateGiggleRedux,
  [Types.UPDATE_RESTORE_PHRASE]: updateRestorePhrase,
  [Types.ADD_CONTACT]: addContact,
  [Types.DEL_CONTACT]: delContact,
  [Types.UPDATE_CONTACT]: updateContact,
  [Types.ADD_TRANSACTION_HISTORY]: addTransactionHistory,
  [Types.UPDATE_GRINRELAY_ADDRESS_INDEX]: updateGrinrelayAddressIndex,
  [Types.ADD_NEW_WALLET]: addNewWallet,
  [Types.UPDATE_CURRENT_WALLET]: updateCurrentWallet,
  [Types.INIT_GIGGLE_REDUX]: initGiggleRedux,
  [Types.ADD_ERROR_LOG]: addErrorLog,
  [Types.CLEAR_TRANSACTION]: clearTransaction,
  [Types.UPDATE_TRANSACTION_CONFIRMED]: updateTransactionConfirmed
})
