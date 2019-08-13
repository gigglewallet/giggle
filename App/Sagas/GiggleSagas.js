import { put, select } from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'
import { NativeModules } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { ERROR_TYPE } from '../Modules/CommonType'
import GiggleActions from '../Redux/GiggleRedux'
import { NavigationActions } from 'react-navigation'

function* getState (name) {
  const result = yield select(state => state[name])
  return result
}

function* getWalletFromAvatarCode (code) {
  const GiggleState = yield getState('giggle')
  const result = GiggleState.wallets.find((item, index) => {
    if (item.avatarCode === code) return item.avatarCode
  })
  return result
}

function* getRustStateJsonString (avatarCode, password) {
  const Wallet = yield getWalletFromAvatarCode(avatarCode)
  if (!avatarCode || !Wallet.walletName) {
    throw new Error(ERROR_TYPE['1001'])
  }
  return JSON.stringify({
    ...AppConfig.walletState,
    data_dir: AppConfig.walletState.data_dir + Wallet.walletName,
    password: !password ? '' : password
  })
}

function* walletRestoreAsync (rustState) {
  let startIndex = 1
  let batchSize = 1000
  let lastIndex = 0
  let highest = 1
  while (lastIndex < highest) {
    let result = yield NativeModules.GrinBridge.walletRestore(rustState, startIndex, batchSize)
    result = JSON.parse(result)
    yield put(GiggleActions.updateWalletRestorePercentage(((parseInt(result.lastRetrievedIndex) / parseInt(result.highestIndex)) * 100)))
    lastIndex = result.lastRetrievedIndex
    highest = result.highestIndex
    startIndex = result.lastRetrievedIndex + 1
  }
}

export function* walletInit (api, { avatarCode, password }) {
  console.log('call walletInit', password)
  yield put(GiggleActions.updateGiggleRequestStatus('walletInit', true, false, false))
  if (!password) {
    console.warn('call walletInit fail: password is empty')
    return
  }

  try {
    const Wallet = yield getWalletFromAvatarCode(avatarCode)
    const FilePath = AppConfig.walletState.data_dir + Wallet.walletName + '/.api_secret'
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.walletInit(RustState, password)
    console.log('result:', result)
    yield put(GiggleActions.updateRestorePhrase(result))
    yield put(GiggleActions.updateGiggleRequestStatus('walletInit', false, true, false))
  } catch (e) {
    console.warn('call walletInit fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('walletInit', false, false, true))
  }
}

export function* walletRecovery (api, { avatarCode, password, mnemonic }) {
  console.log('call walletRecovery', mnemonic)
  if (!mnemonic) {
    console.warn('call walletRecovery fail: mnemonic is empty')
    return
  }
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('walletRecovery', true, false, false))
    const Wallet = yield getWalletFromAvatarCode(avatarCode)
    const FilePath = AppConfig.walletState.data_dir + Wallet.walletName + '/.api_secret'
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.walletRecovery(RustState, mnemonic)
    console.log('result:', result)
    yield put(GiggleActions.updateGiggleRequestStatus('walletRecovery', false, true, false))
  } catch (e) {
    yield put(GiggleActions.updateGiggleRequestStatus('walletRecovery', false, false, true))
  }
}

export function* walletRestore (api, { avatarCode, password }) {
  console.log('call walletRestore', avatarCode)
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('walletRestore', true, false, false))
    const Wallet = yield getWalletFromAvatarCode(avatarCode)
    const FilePath = AppConfig.walletState.data_dir + Wallet.walletName + '/.api_secret'
    console.log(FilePath)
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const RustState = yield getRustStateJsonString(avatarCode, password)
    yield walletRestoreAsync(RustState)
    console.log('wallet restore finist')
    yield put(GiggleActions.updateGiggleRequestStatus('walletRestore', false, true, false))
  } catch (e) {
    console.error('call walletRestore fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('walletRestore', false, false, true))
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

export function* getBalance (api, { avatarCode, password }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getBalance', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.balance(RustState)
    result = JSON.parse(result)
    yield put(GiggleActions.updateGiggleRequestStatus('getBalance', false, true, false))
    let index = yield getIndexByAvatarCode(avatarCode)
    yield put(GiggleActions.updateWalletBalanceByIndex(index, parseInt(result.total) / 100000000))
  } catch (e) {
    console.warn('call getBalance fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('getBalance', false, false, true))
  }
}

export function* getHeight (api, { avatarCode, password }) {
  console.log('call getHeight')
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getHeight', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.height(RustState)
    console.log('result:', result)
    yield put(GiggleActions.updateGiggleRequestStatus('getHeight', false, true, false))
  } catch (e) {
    console.error('call getHeight fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('getHeight', false, false, true))
  }
}

export function* txCreateByFile (api, { avatarCode, password, amount, strategy, message, version }) {
  console.log('call txCreate', amount)
  if (!amount) {
    console.warn('call txCreate fail: amount is empty')
    return
  }
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('txCreateByFile', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.txCreate(RustState, amount, message, strategy, version)
    result = JSON.parse(result)
    console.log('result', result)
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    console.log(wallet)
    const filePath = AppConfig.walletState.data_dir + wallet.walletName + '/' + result.id + '.init'
    yield RNFetchBlob.fs.writeFile(filePath, JSON.stringify(result), 'utf8')

    yield put(GiggleActions.updateGiggleRequestStatus('txCreateByFile', false, true, false))
  } catch (e) {
    console.error('call txCreate fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('txCreateByFile', false, false, true))
  }
}

export function* txReceiveByFile (api, { avatarCode, password, filePath, message }) {
  console.log('call txReceiveByFile', filePath)
  if (!filePath) {
    console.warn('call txReceiveByFile fail: filePath is empty')
    return
  }
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('txReceiveByFile', true, false, false))
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.txReceive(RustState, filePath, message)
    result = JSON.parse(result)
    const path = AppConfig.walletState.data_dir + wallet.walletName + '/' + result.id + '.rx'
    yield RNFetchBlob.fs.writeFile(path, JSON.stringify(result), 'utf8')
    yield put(GiggleActions.updateGiggleRequestStatus('txReceiveByFile', false, true, false))
  } catch (e) {
    console.error('call txReceiveByFile fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('txReceiveByFile', false, false, true))
  }
}

export function* walletPhrase (api, { avatarCode, password }) {
  console.debug(`walletPhrase`)
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('walletPhrase', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.walletPhrase(RustState)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('walletPhrase', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('walletPhrase', false, false, true))
  }
}

export function* txFinalize (api, { avatarCode, password, filePath }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('txFinalize', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.txFinalize(RustState, filePath)
    result = JSON.parse(result)
    console.log('result=', result)
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    const path = AppConfig.walletState.data_dir + wallet.walletName + '/' + result.id + '.finalized'
    console.log('path', path)
    yield RNFetchBlob.fs.writeFile(path, JSON.stringify(result), 'utf8')
    yield put(GiggleActions.updateGiggleRequestStatus('txFinalize', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('txFinalize', false, false, true))
  }
}

export function* txPost (api, { avatarCode, password, slateId }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('txPost', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txPost(RustState, slateId)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('txPost', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('txPost', false, false, true))
  }
}
export function* txCancel (api, { avatarCode, password, slateId }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('txCancel', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txCancel(RustState, slateId)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('txCancel', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('txCancel', false, false, true))
  }
}
export function* getAllTransactions (api, { avatarCode, password }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getAllTransactions', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txsGet(RustState)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('getAllTransactions', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('getAllTransactions', false, false, true))
  }
}
export function* getTransactionDetail (api, { avatarCode, password, slateId }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getTransactionDetail', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txGet(RustState, slateId)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('getTransactionDetail', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('getTransactionDetail', false, false, true))
  }
}
export function* getAllOutputs (api, { avatarCode, password }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getAllOutputs', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.outputsGet(RustState)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('getAllOutputs', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('getAllOutputs', false, false, true))
  }
}

export function* cleanWallet (api, { avatarCode }) {
  yield put(GiggleActions.updateGiggleRequestStatus('cleanWallet', true, false, false))
  const wallet = yield getWalletFromAvatarCode(avatarCode)
  console.log('name', wallet.walletName)
  const isDir = RNFetchBlob.fs.isDir(AppConfig.walletState.data_dir + wallet.walletName)
  if (isDir) {
    RNFetchBlob.fs.unlink(AppConfig.walletState.data_dir + wallet.walletName)
  }
  yield put(GiggleActions.updateGiggleRequestStatus('cleanWallet', false, true, false))
}

function* writeNodeApiSecret (api, { avatarCode }) {
  try {
    const wallet = yield getWalletFromAvatarCode(avatarCode)
    const path = AppConfig.walletState.data_dir + wallet.walletName + '/.api_secret'
    const result = yield RNFetchBlob.fs.writeFile(path, AppConfig.nodeApiSecret, 'utf8')
    console.log('result=', result)
  } catch (e) {
    console.warn(e)
  }
}

export function* updateGiggleRequestStatusAction (api, { actionType, isCalling, isSuccess, isFail }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus(actionType, isCalling, isSuccess, isFail))
  } catch (e) {
    console.warn(e)
  }
}

export function* restoreWallet (api, { avatarCode, password, mnemonic }) {
  
  let routeName = ''

  try {
    let result = yield walletRecovery(null, { avatarCode: avatarCode, password: password, mnemonic: mnemonic })
  
    const GiggleState = yield getState('giggle')

    if (GiggleState.isSuccessWalletRecovery) {
      result = yield walletRestore(null, { avatarCode: avatarCode, password: password })
      result = yield getBalance(null, { avatarCode: avatarCode, password: password })
      routeName = 'SignUpComplete'
    }else{
      routeName = 'Restore'
    }

    let action = NavigationActions.navigate({
      routeName: routeName, 
      params:{}, 
      action: NavigationActions.navigate({ routeName: routeName })
    })
    
    yield put(action)

  } catch (e) {
    console.log(e)
  }
}
