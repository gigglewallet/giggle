import { put, select } from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'
import { NativeModules } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { ERROR_TYPE } from '../Modules/CommonType'
import GiggleActions from '../Redux/GiggleRedux'
import GeneralActions from '../Redux/GeneralRedux'
import { NavigationActions, StackActions } from 'react-navigation'
import WalletStatusActions from '../Redux/WalletStatusRedux'
import { TRANSACTION_TYPE, GRIN_UNIT } from '../Modules/CommonType'
import KeepAwake from 'react-native-keep-awake'
import { TRANSACTION_METHOD } from '../Modules/CommonType'
import { AsyncStorage } from 'react-native'
import * as Keychain from 'react-native-keychain'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function* getState (name) {
  const result = yield select(state => state[name])
  return result
}

function* getWalletFromAvatarCode (code) {
  console.log('getWalletFromAvatarCode:' + code)
  const GiggleState = yield getState('giggle')
  const result = GiggleState.wallets.find((item, index) => {
    if (item.avatarCode === code) return item.avatarCode
  })
  console.log('call getWalletFromAvatarCode =', result)
  return result
}

function* getRustStateJsonString (avatarCode, password) {
  // const Wallet = yield getWalletFromAvatarCode(avatarCode)
  console.log('getRustStateJsonString:' + avatarCode + ',' + password)
  let Wallet = null
  if (avatarCode) {
    Wallet = yield getWalletFromAvatarCode(avatarCode)
  } else {
    Wallet = { avatarCode: 'init', walletName: 'wallet_1', password: password }
    avatarCode = 'init'
  }

  const GiggleState = yield getState('giggle')
  if (!avatarCode || !Wallet.walletName) {
    throw new Error(ERROR_TYPE['1001'])
  }

  if (GiggleState.bestNodeApiAddress) {
    return JSON.stringify({
      ...AppConfig.walletState,
      data_dir: AppConfig.walletState.data_dir + Wallet.walletName,
      node_api_addr: GiggleState.bestNodeApiAddress,
      password: !password ? '' : password,
      grinrelay_config: {
        ...AppConfig.walletState.grinrelay_config,
        grinrelay_receiving_address_index: GiggleState.relayAddressIndex
      }
    })
  } else {
    return JSON.stringify({
      ...AppConfig.walletState,
      data_dir: AppConfig.walletState.data_dir + Wallet.walletName,
      password: !password ? '' : password,
      grinrelay_config: {
        ...AppConfig.walletState.grinrelay_config,
        grinrelay_receiving_address_index: GiggleState.relayAddressIndex
      }
    })
  }
}

function* getRustStateJsonStringWithoutCode (password, walletName) {
  console.log(password, walletName)
  const GiggleState = yield getState('giggle')
  if (!password || !walletName) {
    throw new Error(ERROR_TYPE['1001'])
  }

  if (GiggleState.bestNodeApiAddress) {
    return JSON.stringify({
      ...AppConfig.walletState,
      data_dir: AppConfig.walletState.data_dir + walletName,
      node_api_addr: GiggleState.bestNodeApiAddress,
      password: !password ? '' : password,
      grinrelay_config: {
        ...AppConfig.walletState.grinrelay_config,
        grinrelay_receiving_address_index: GiggleState.relayAddressIndex
      }
    })
  } else {
    return JSON.stringify({
      ...AppConfig.walletState,
      data_dir: AppConfig.walletState.data_dir + walletName,
      password: !password ? '' : password,
      grinrelay_config: {
        ...AppConfig.walletState.grinrelay_config,
        grinrelay_receiving_address_index: GiggleState.relayAddressIndex
      }
    })
  }
}

function* walletRestoreAsync (rustState) {
  let startIndex = 1
  let batchSize = 1000
  let lastIndex = 0
  let highest = 1
  KeepAwake.activate()
  while (lastIndex < highest) {
    let result = yield NativeModules.GrinBridge.walletRestore(rustState, startIndex, batchSize)
    result = JSON.parse(result)
    yield put(WalletStatusActions.updateWalletRestorePercentage(((parseInt(result.lastRetrievedIndex) / parseInt(result.highestIndex)) * 100)))
    lastIndex = result.lastRetrievedIndex
    highest = result.highestIndex
    startIndex = result.lastRetrievedIndex + 1
  }
  KeepAwake.deactivate()
}

export function* walletInit ({ avatarCode, password, is12Phrase }) {
  console.log('call walletInit', avatarCode, password)

  const WalletState = yield getState('walletStatus')
  const GiggleState = yield getState('giggle')

  const walletName = 'wallet_' + (GiggleState.wallets.length + 1)

  yield put(WalletStatusActions.updateGiggleRequestStatus('walletInit', true, false, false))
  if (!password) {
    console.warn('call walletInit fail: password is empty')
    return
  }

  try {
    const FilePath = AppConfig.walletState.data_dir + walletName + '/.api_secret'
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const randomInitIndex = Math.floor(Math.random() * 99999)
    yield put(GiggleActions.updateGiggleRedux('relayAddressIndex', randomInitIndex))
    // yield put(GiggleActions.updateGrinrelayAddressIndex({randomInitIndex}))
    // const RustState = yield getRustStateJsonString(avatarCode, password)
    const RustState = yield getRustStateJsonStringWithoutCode(password, walletName)
    const result = yield NativeModules.GrinBridge.walletInit(RustState, password, WalletState.is12Phrase)
    yield put(GiggleActions.updateRestorePhrase(result))
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletInit', false, true, false))
    const myAddress = yield NativeModules.GrinBridge.myRelayAddress(RustState)
    yield put(GiggleActions.updateGiggleRedux('relayAddress', myAddress))

    const myAvatarCode = yield getAvatarCodeByRelayAddress(myAddress)

    yield put(GiggleActions.addNewWallet({
      avatarCode: myAvatarCode,
      password: password,
      walletName: walletName
    }))

    yield put(GiggleActions.updateGiggleRedux('currentWallet', {
      avatarCode: myAvatarCode,
      password: password,
      walletName: walletName,
      balance: 0
    }))

    yield Keychain.setGenericPassword(myAvatarCode, WalletState.tempPin)
    yield listen()
  } catch (e) {
    console.warn('call walletInit fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletInit', false, false, true))
  }
}

function* getAvatarCodeByRelayAddress (address) {
  const avatarCode = address.substr(address.length - 6, 6)
  return avatarCode
}
export function* walletRecovery ({ avatarCode, password, mnemonic }) {
  console.log('call walletRecovery', mnemonic)
  if (!mnemonic) {
    console.warn('call walletRecovery fail: mnemonic is empty')
    return
  }
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRecovery', true, false, false))
    const Wallet = yield getWalletFromAvatarCode(avatarCode)
    console.log(Wallet)
    const FilePath = AppConfig.walletState.data_dir + Wallet.walletName + '/.api_secret'
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.walletRecovery(RustState, mnemonic)
    console.log('result:', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRecovery', false, true, false))
    if (result) {
      const myAddress = yield NativeModules.GrinBridge.myRelayAddress(RustState)
      const myAvatarCode = yield getAvatarCodeByRelayAddress(myAddress)
      yield put(GiggleActions.updateWalletAvatarCodeByIndex(0, myAvatarCode))
    }
  } catch (e) {
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRecovery', false, false, true))
  }
}

export function* walletRecoveryWithoutCode ({ password, mnemonic, walletName, isProcessLoading = true }) {
  console.log('call walletRecovery', mnemonic)
  if (!mnemonic) {
    console.warn('call walletRecovery fail: mnemonic is empty')
    return
  }
  try {
    if (isProcessLoading) yield put(WalletStatusActions.updateGiggleRequestStatus('walletRecovery', true, false, false))
    const RustState = yield getRustStateJsonStringWithoutCode(password, walletName)
    const result = yield NativeModules.GrinBridge.walletRecovery(RustState, mnemonic)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRecovery', false, true, false))
    if (result) {
      const randomInitIndex = yield Math.floor(Math.random() * 99999)
      yield put(GiggleActions.updateGiggleRedux('relayAddressIndex', randomInitIndex))
      const myAddress = yield NativeModules.GrinBridge.myRelayAddress(RustState)
      const myAvatarCode = yield getAvatarCodeByRelayAddress(myAddress)
      console.log('tempAvatarCode', myAvatarCode)
      yield put(WalletStatusActions.updateWalletStatusRedux('tempAvatarCode', myAvatarCode))
    }
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRecovery', false, false, true))
  }
}

export function* walletRestore ({ avatarCode, password }) {
  console.log('call walletRestore', avatarCode)
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRestore', true, false, false))
    const Wallet = yield getWalletFromAvatarCode(avatarCode)
    const FilePath = AppConfig.walletState.data_dir + Wallet.walletName + '/.api_secret'
    console.log(FilePath)
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const randomInitIndex = yield Math.floor(Math.random() * 99999)

    yield put(GiggleActions.updateGiggleRedux('relayAddressIndex', randomInitIndex))

    const RustState = yield getRustStateJsonString(avatarCode, password)
    yield walletRestoreAsync(RustState)
    console.log('wallet restore finist')
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRestore', false, true, false))
  } catch (e) {
    console.error('call walletRestore fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRestore', false, false, true))
  }
}
export function* walletRestoreWithoutCode ({ password, walletName }) {
  console.log('call walletRestoreWithoutCode ', password, walletName)
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRestore', true, false, false))

    const randomInitIndex = yield Math.floor(Math.random() * 99999)

    yield put(GiggleActions.updateGiggleRedux('relayAddressIndex', randomInitIndex))

    const RustState = yield getRustStateJsonStringWithoutCode(password, walletName)
    yield walletRestoreAsync(RustState)
    console.log('wallet restore finist')
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRestore', false, true, false))
  } catch (e) {
    console.error('call walletRestore fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletRestore', false, false, true))
  }
}

function* getIndexByAvatarCode (avatarCode) {
  const GiggleState = yield getState('giggle')
  let result = -1
  GiggleState.wallets.find((item, index) => {
    if (item.avatarCode === avatarCode) {
      result = index
    }
  })
  return result
}

export function* getBalance ({ avatarCode, password, isProcessLoading = true, isHomeRefresh = false }) {
  try {
    if (isProcessLoading) yield put(WalletStatusActions.updateGiggleRequestStatus('getBalance', true, false, false))
    if (isHomeRefresh) yield put(WalletStatusActions.updateWalletStatusRedux('homeRefreshing', true))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.balance(RustState)
    console.log('call getBalance', result)
    result = JSON.parse(result)

    if (isProcessLoading) yield put(WalletStatusActions.updateGiggleRequestStatus('getBalance', false, true, false))
    // let index = yield getIndexByAvatarCode(avatarCode)
    yield put(GiggleActions.updateCurrentWallet({ balance: parseInt(result.total) / GRIN_UNIT }))

    if (isHomeRefresh) yield put(WalletStatusActions.updateWalletStatusRedux('homeRefreshing', false))
  } catch (e) {
    console.warn('call getBalance fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getBalance', false, false, true))
  }
}

export function* getHeight ({ avatarCode, password }) {
  console.log('call getHeight')
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('getHeight', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.height(RustState)
    console.log('result:', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getHeight', false, true, false))
  } catch (e) {
    console.error('call getHeight fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getHeight', false, false, true))
  }
}

export function* txCreateByFile ({ avatarCode, password, amount, strategy, message, version }) {
  console.log('call txCreate', amount)
  if (!amount) {
    console.warn('call txCreate fail: amount is empty')
    return
  }
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('txCreateByFile', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.txCreate(RustState, amount, message, strategy, version)
    result = JSON.parse(result)
    console.log('result', result)
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    console.log(wallet)
    const filePath = AppConfig.walletState.data_dir + wallet.walletName + '/' + result.id + '.init'
    yield RNFetchBlob.fs.writeFile(filePath, JSON.stringify(result), 'utf8')

    yield put(WalletStatusActions.updateGiggleRequestStatus('txCreateByFile', false, true, false))
  } catch (e) {
    console.error('call txCreate fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txCreateByFile', false, false, true))
  }
}

export function* txReceiveByFile ({ avatarCode, password, filePath, message }) {
  console.log('call txReceiveByFile', filePath)
  if (!filePath) {
    console.warn('call txReceiveByFile fail: filePath is empty')
    return
  }
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('txReceiveByFile', true, false, false))
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.txReceive(RustState, filePath, message)
    result = JSON.parse(result)
    const path = AppConfig.walletState.data_dir + wallet.walletName + '/' + result.id + '.rx'
    yield RNFetchBlob.fs.writeFile(path, JSON.stringify(result), 'utf8')
    yield put(WalletStatusActions.updateGiggleRequestStatus('txReceiveByFile', false, true, false))
  } catch (e) {
    console.error('call txReceiveByFile fail:', e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txReceiveByFile', false, false, true))
  }
}

export function* walletPhrase ({ avatarCode, password }) {
  console.debug(`walletPhrase`)
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletPhrase', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.walletPhrase(RustState)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletPhrase', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('walletPhrase', false, false, true))
  }
}

export function* txFinalize ({ avatarCode, password, filePath }) {
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('txFinalize', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.txFinalize(RustState, filePath)
    result = JSON.parse(result)
    console.log('result=', result)
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    const path = AppConfig.walletState.data_dir + wallet.walletName + '/' + result.id + '.finalized'
    console.log('path', path)
    yield RNFetchBlob.fs.writeFile(path, JSON.stringify(result), 'utf8')
    yield put(WalletStatusActions.updateGiggleRequestStatus('txFinalize', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txFinalize', false, false, true))
  }
}

export function* txPost ({ avatarCode, password, slateId }) {
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('txPost', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txPost(RustState, slateId)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txPost', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txPost', false, false, true))
  }
}
export function* txCancel ({ avatarCode, password, slateId }) {
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('txCancel', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txCancel(RustState, slateId)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txCancel', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txCancel', false, false, true))
  }
}
export function* getAllTransactions ({ avatarCode, password }) {
  console.log('call getAllTransactions', avatarCode, password)
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('getAllTransactions', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    console.log(RustState)
    const result = yield NativeModules.GrinBridge.txsGet(RustState)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getAllTransactions', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getAllTransactions', false, false, true))
  }
}
export function* getTransactionDetail ({ avatarCode, password, slateId }) {
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('getTransactionDetail', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txGet(RustState, slateId)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getTransactionDetail', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getTransactionDetail', false, false, true))
  }
}
export function* getAllOutputs ({ avatarCode, password }) {
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus('getAllOutputs', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.outputsGet(RustState)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getAllOutputs', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('getAllOutputs', false, false, true))
  }
}

export function* cleanWallet ({ avatarCode }) {
  yield put(WalletStatusActions.updateGiggleRequestStatus('cleanWallet', true, false, false))
  const wallet = yield getWalletFromAvatarCode(avatarCode)
  console.log('name', wallet.walletName)
  const isDir = RNFetchBlob.fs.isDir(AppConfig.walletState.data_dir + wallet.walletName)
  if (isDir) {
    RNFetchBlob.fs.unlink(AppConfig.walletState.data_dir + wallet.walletName)
  }
  yield put(WalletStatusActions.updateGiggleRequestStatus('cleanWallet', false, true, false))
}

function* writeNodeApiSecret ({ avatarCode }) {
  try {
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    const path = AppConfig.walletState.data_dir + wallet.walletName + '/.api_secret'
    const result = yield RNFetchBlob.fs.writeFile(path, AppConfig.nodeApiSecret, 'utf8')
    console.log('result=', result)
  } catch (e) {
    console.warn(e)
  }
}

export function* restoreWallet () {
  let routeName = ''

  try {
    const WalletState = yield getState('walletStatus')
    const GiggleState = yield getState('giggle')
    const restorePhraseString = GiggleState.restorePhrase.join(' ').trim()
    const walletName = 'wallet_' + (GiggleState.wallets.length + 1)
    yield walletRecoveryWithoutCode({ password: WalletState.tempPassword, mnemonic: restorePhraseString, walletName, isProcessLoading: false })
    const NewWalletStatusState = yield getState('walletStatus')
    yield listen()
    if (NewWalletStatusState.isSuccessWalletRecovery) {
      yield walletRestoreWithoutCode({ password: NewWalletStatusState.tempPassword, walletName: walletName })

      const RA_RustState = yield getRustStateJsonStringWithoutCode(NewWalletStatusState.tempPassword, walletName)
      const relayAddress = yield NativeModules.GrinBridge.myRelayAddress(RA_RustState)
      yield put(GiggleActions.updateGiggleRedux('relayAddress', relayAddress))

      const myAvatarCode = yield getAvatarCodeByRelayAddress(relayAddress)

      yield put(GiggleActions.addNewWallet({
        avatarCode: myAvatarCode,
        password: NewWalletStatusState.tempPassword,
        walletName: walletName
      }))

      yield put(GiggleActions.updateGiggleRedux('currentWallet', {
        avatarCode: myAvatarCode,
        password: NewWalletStatusState.tempPassword,
        walletName: walletName
      }))

      yield put(GiggleActions.updateGiggleRedux('isBackupPhrase', true))
      yield getBalance({ avatarCode: myAvatarCode, password: NewWalletStatusState.tempPassword })
      yield Keychain.setGenericPassword(myAvatarCode, WalletState.tempPin)
      yield listen()

      routeName = 'SignUpComplete'
    } else {
      routeName = 'Restore'
    }

    let action = NavigationActions.navigate({
      routeName: routeName,
      params: {},
      action: NavigationActions.navigate({ routeName: routeName })
    })

    yield put(action)
  } catch (e) {
    console.log(e)
  }
}

export function* txSend ({ avatarCode, password, price, note, url }) {
  try {
    KeepAwake.activate()
    yield put(WalletStatusActions.updateGiggleRequestStatus('txSend', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txSend(RustState, price, 'all', note, -1, url)
    console.log('call txSend result=', result)
    if (!result) throw new Error('txSend fail')
    yield put(WalletStatusActions.updateGiggleRequestStatus('txSend', false, true, false))
    KeepAwake.deactivate()
  } catch (e) {
    console.warn(e)
    KeepAwake.deactivate()
    yield put(WalletStatusActions.updateGiggleRequestStatus('txSend', false, false, true))
  }
}

export function* listen () {
  try {
    console.log('**** listen ****')
    const GiggleState = yield getState('giggle')
    const password = GiggleState.currentWallet.password
    const avatarCode = GiggleState.currentWallet.avatarCode

    console.log(avatarCode)
    let RustState = yield getRustStateJsonString(avatarCode, password)
    let bestNodeApiAddress = yield NativeModules.GrinBridge.selectNearestNode(JSON.parse(RustState).node_api_addr)
    if (bestNodeApiAddress) {
      // Workaround[start]
      bestNodeApiAddress = (bestNodeApiAddress === 'https://relay.grin.icu:13413' || bestNodeApiAddress === 'https://nodes.grin.icu:13413') ? 'https://hk.grin.icu:13413' : bestNodeApiAddress
      // Workaround[end]
      yield put(GiggleActions.updateGiggleRedux('bestNodeApiAddress', bestNodeApiAddress))
    }
    // const address_string = yield NativeModules.GrinBridge.myRelayAddress(RustState)
    // console.log(address_string)
    // tn1-qtm44dth-236kmuu4js4k0m0-hfp2nshrxvx69lp-2ewn6lhtdgw7a95-ydgs9l

    yield NativeModules.GrinBridge.listen(RustState)
    yield put(WalletStatusActions.updateWalletStatusRedux('isOnline', true))
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateWalletStatusRedux('isOnline', false))
  }
}
export function* relayAddressQuery ({ targetAvatarCode, callback }) {
  console.log('call relayAddressQuery', targetAvatarCode)
  try {
    const GiggleState = yield getState('giggle')
    if (GiggleState.wallets.length === 0) {
      console.warn('wallet is empty')
    }
    const { avatarCode, password } = GiggleState.currentWallet
    if (GiggleState.relayAddress) yield put(WalletStatusActions.updateWalletStatusRedux('relayAddress', null))
    yield put(WalletStatusActions.updateGiggleRequestStatus('relayAddressQuery', true, false, false))
    yield sleep(2000)
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.relayAddressQuery(RustState, targetAvatarCode)
    console.log('result=', result)
    yield put(WalletStatusActions.updateGiggleRequestStatus('relayAddressQuery', false, true, false))
    yield put(WalletStatusActions.updateWalletStatusRedux('relayAddress', result))
    if (callback) callback(result)
  } catch (e) {
    console.warn(e)
    yield put(WalletStatusActions.updateGiggleRequestStatus('relayAddressQuery', false, false, true))
  }
}

export function* sendTransaction ({ info }) {
  console.log('call sendTransaction', info)
  try {
    const GiggleState = yield getState('giggle')
    const WalletStatusState = yield getState('walletStatus')
    const { avatarCode, password, walletName } = GiggleState.currentWallet
    const price = parseFloat(info.amount) * GRIN_UNIT
    const method = parseInt(info.method)
    yield put(WalletStatusActions.updateGiggleRequestStatus('txSend', true, false, false))
    KeepAwake.activate()
    const RustState = yield getRustStateJsonStringWithoutCode(password, walletName)
    let result = null
    const note = (info.note) ? info.note : null
    console.log('sendTransaction note =', note)
    if (method === TRANSACTION_METHOD.AVATAR_CODE) {
      result = yield NativeModules.GrinBridge.txSend(RustState, price, 'all', note, -1, WalletStatusState.relayAddress)
      result = JSON.parse(result)
    } else {
      result = yield NativeModules.GrinBridge.txSend(RustState, price, 'all', note, -1, info.avatarCode)
      result = JSON.parse(result)
    }
    KeepAwake.deactivate()
    yield put(WalletStatusActions.updateGiggleRequestStatus('txSend', false, true, false))
    yield put(WalletStatusActions.updateWalletStatusRedux('relayAddress', ''))
    yield put(GiggleActions.addTransactionHistory({
      id: result.id,
      height: result.height,
      type: TRANSACTION_TYPE.SendSuccess,
      isContact: info.isContact,
      avatarCode: info.avatarCode,
      nickname: info.nickname,
      method: info.method,
      amount: parseFloat(info.amount),
      fee: (result.fee) ? result.fee / GRIN_UNIT : 0,
      note: info.note,
      date: Date.now()
    }))

    yield getBalance({ avatarCode, password, isProcessLoading: false })
    const action = NavigationActions.navigate({
      routeName: 'AskDone',
      params: {
        ...info
      },
      action: NavigationActions.navigate({ routeName: 'routeName' })
    })
    yield put(action)
  } catch (error) {
    KeepAwake.deactivate()
    yield put(WalletStatusActions.updateWalletStatusRedux('isSendTransactionFail', true))
    yield put(WalletStatusActions.updateGiggleRequestStatus('txSend', false, false, true))
    yield put(GiggleActions.addErrorLog({ action: 'sendTransaction', message: error.toString(), time: Date.now() }))
    console.warn(error)
  }
}

export function* getNewAvatar () {
  const GiggleState = yield getState('giggle')
  const avatarCode = GiggleState.currentWallet.avatarCode
  const password = GiggleState.currentWallet.password
  const walletName = GiggleState.currentWallet.walletName

  let index = GiggleState.relayAddressIndex

  index = index + 1

  try {
    // yield put(GiggleActions.updateGrinrelayAddressIndex({index}))
    yield put(GiggleActions.updateGiggleRedux('relayAddressIndex', index))
    const RustState = yield getRustStateJsonString(avatarCode, password)

    const result = yield NativeModules.GrinBridge.myRelayAddress(RustState)

    yield put(GiggleActions.updateGiggleRedux('relayAddress', result))
    console.log(result)
    const myAvatarCode = yield getAvatarCodeByRelayAddress(result)

    yield put(GiggleActions.updateWalletAvatarCodeByIndex(0, myAvatarCode))
    console.log(`setCurrentwallet`)
    console.log(myAvatarCode)
    // yield put(GiggleActions.setCurrentWallet({avatarCode: myAvatarCode, password: password, walletName: walletName}))
    yield put(GiggleActions.updateGiggleRedux('currentWallet', { avatarCode: myAvatarCode, password: password, walletName: walletName }))
    yield getBalance({ avatarCode: myAvatarCode, password: password })
    console.log(`listen`)
    // yield sleep(10)
    yield listen()
  } catch (e) {
    console.log(e)
  }
}

export function* setCurrentWallet ({ wallet }) {
  console.log(wallet)
  yield put(GiggleActions.updateGiggleRedux('currentWallet', wallet))
}

export function* setNewContact ({ avatarCode, nickname, method }) {
  const GiggleState = yield getState('giggle')
  const result = GiggleState.contacts.find((item, index) => {
    if (item.avatarCode === avatarCode) return item.avatarCode
  })

  try {
    if (!result) yield put(GiggleActions.addContact(avatarCode, nickname, method))
  } catch (e) {
    console.log(e)
  }
}

export function* logout () {
  console.log('logout')
  const GiggleState = yield getState('giggle')
  const wallets = GiggleState.wallets

  // console.log(wallets)
  yield wallets.forEach((value, key) => {
    console.log('clear wallet')
    console.log(value)
    GiggleActions.cleanWallet(value.avatarCode)
  })

  try {
    const isDir = RNFetchBlob.fs.isDir(AppConfig.walletState.data_dir + 'wallet_1')
    if (isDir) {
      RNFetchBlob.fs.unlink(AppConfig.walletState.data_dir + 'wallet_1')
    }
  } catch (e) {
    console.log(`remove wallet_1`)
    console.log(e)
  }

  console.log(`clear storage`)
  yield put(GeneralActions.clearStorage())
  console.log(`initGiggleRedux`)
  yield put(GiggleActions.initGiggleRedux())
  yield put(WalletStatusActions.initWalletRedux())

  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'SignUp' })
    ]
  })

  yield put(resetAction)
}

export function* checkFaceId () {
  yield put(WalletStatusActions.updateWalletStatusRedux('isVerify', false))
  const routeName = 'Login'

  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: routeName })
    ]
  })

  yield put(resetAction)
}

export function* test () {
  // const Wallet = yield getWalletFromAvatarCode(avatarCode)
  yield sleep(2000)
  // 85s8zd
  yield listen()
  // yield AsyncStorage.clear()
  /*
  const GiggleState = yield getState('giggle')
  console.log(GiggleState)
  for (let value in GiggleState) {
    if (GiggleState[value]) console.log(value)
  }
  */
  /*
  yield sleep(3000)
  const GiggleState = yield getState('giggle')
  const password = GiggleState.wallets[0].password
  const avatarCode = GiggleState.wallets[0].avatarCode
  const price = parseInt(10) * GRIN_UNIT

  const RustState = yield getRustStateJsonString(avatarCode, password)
  yield sleep(3000)
  try {
    const result = yield NativeModules.GrinBridge.txSend(RustState, price, 'all', 'test', -1, 'http://sga.grin.icu:13415')

    console.log('tay ', JSON.parse(result))
  } catch (err) {
    console.log(err)
  }
  */
  // yield listen({ avatarCode: 'ydgs9l', password: '11' })
  // yield getAllOutputs({ avatarCode: 'ydgs9l', password: '11' })
  // yield getAllTransactions({ avatarCode: 'ydgs9l', password: '11' })
  // yield relayAddressQuery({ targetAvatarCode: 'ydgs9l' })
}
