import { put, select } from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'
import { NativeModules } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { ERROR_TYPE } from '../Modules/CommonType'
import GiggleActions from '../Redux/GiggleRedux'
import { NavigationActions } from 'react-navigation'
import WalletStatusActions from '../Redux/WalletStatusRedux'
import { TRANSACTION_TYPE } from '../Modules/CommonType'
import KeepAwake from 'react-native-keep-awake'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
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
  KeepAwake.activate()
  while (lastIndex < highest) {
    let result = yield NativeModules.GrinBridge.walletRestore(rustState, startIndex, batchSize)
    result = JSON.parse(result)
    yield put(GiggleActions.updateWalletRestorePercentage(((parseInt(result.lastRetrievedIndex) / parseInt(result.highestIndex)) * 100)))
    lastIndex = result.lastRetrievedIndex
    highest = result.highestIndex
    startIndex = result.lastRetrievedIndex + 1
  }
  KeepAwake.deactivate()
}

export function* walletInit ({ avatarCode, password, is12Phrase }) {
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
    const result = yield NativeModules.GrinBridge.walletInit(RustState, password, is12Phrase)
    console.log('result:', result)
    yield put(GiggleActions.updateRestorePhrase(result))
    yield put(GiggleActions.updateGiggleRequestStatus('walletInit', false, true, false))

    const myAddress = yield NativeModules.GrinBridge.myRelayAddress(RustState)
    const myAvatarCode = yield getAvatarCodeByRelayAddress(myAddress) // .substr(myAddress.length - 6, 6)
    // yield put(GiggleActions.updateWalletAvatarCodeByIndex(walletIndex, avatarCode))
    yield put(GiggleActions.updateWalletAvatarCodeByIndex(0, myAvatarCode))
    // yield getAvatarCodeByRelayAddress(address_string)
  } catch (e) {
    console.warn('call walletInit fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('walletInit', false, false, true))
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
    yield put(GiggleActions.updateGiggleRequestStatus('walletRecovery', true, false, false))
    const Wallet = yield getWalletFromAvatarCode(avatarCode)
    console.log(Wallet)
    const FilePath = AppConfig.walletState.data_dir + Wallet.walletName + '/.api_secret'
    yield RNFetchBlob.fs.writeFile(FilePath, AppConfig.nodeApiSecret, 'utf8')

    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.walletRecovery(RustState, mnemonic)
    console.log('result:', result)
    yield put(GiggleActions.updateGiggleRequestStatus('walletRecovery', false, true, false))
    if (result) {
      const myAddress = yield NativeModules.GrinBridge.myRelayAddress(RustState)
      const myAvatarCode = yield getAvatarCodeByRelayAddress(myAddress)
      yield put(GiggleActions.updateWalletAvatarCodeByIndex(0, myAvatarCode))
    }
  } catch (e) {
    yield put(GiggleActions.updateGiggleRequestStatus('walletRecovery', false, false, true))
  }
}

export function* walletRestore ({ avatarCode, password }) {
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

export function* getBalance ({ avatarCode, password }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getBalance', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    let result = yield NativeModules.GrinBridge.balance(RustState)
    console.log('call getBalance', result)
    result = JSON.parse(result)
    yield put(GiggleActions.updateGiggleRequestStatus('getBalance', false, true, false))
    let index = yield getIndexByAvatarCode(avatarCode)
    yield put(GiggleActions.updateWalletBalanceByIndex(index, parseInt(result.total) / 100000000))
  } catch (e) {
    console.warn('call getBalance fail:', e)
    yield put(GiggleActions.updateGiggleRequestStatus('getBalance', false, false, true))
  }
}

export function* getHeight ({ avatarCode, password }) {
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

export function* txCreateByFile ({ avatarCode, password, amount, strategy, message, version }) {
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

export function* txReceiveByFile ({ avatarCode, password, filePath, message }) {
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

export function* walletPhrase ({ avatarCode, password }) {
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

export function* txFinalize ({ avatarCode, password, filePath }) {
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

export function* txPost ({ avatarCode, password, slateId }) {
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
export function* txCancel ({ avatarCode, password, slateId }) {
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
export function* getAllTransactions ({ avatarCode, password }) {
  console.log('call getAllTransactions', avatarCode, password)
  try {
    yield put(GiggleActions.updateGiggleRequestStatus('getAllTransactions', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    console.log(RustState)
    const result = yield NativeModules.GrinBridge.txsGet(RustState)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('getAllTransactions', false, true, false))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('getAllTransactions', false, false, true))
  }
}
export function* getTransactionDetail ({ avatarCode, password, slateId }) {
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
export function* getAllOutputs ({ avatarCode, password }) {
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

export function* cleanWallet ({ avatarCode }) {
  yield put(GiggleActions.updateGiggleRequestStatus('cleanWallet', true, false, false))
  const wallet = yield getWalletFromAvatarCode(avatarCode)
  console.log('name', wallet.walletName)
  const isDir = RNFetchBlob.fs.isDir(AppConfig.walletState.data_dir + wallet.walletName)
  if (isDir) {
    RNFetchBlob.fs.unlink(AppConfig.walletState.data_dir + wallet.walletName)
  }
  yield put(GiggleActions.updateGiggleRequestStatus('cleanWallet', false, true, false))
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

export function* updateGiggleRequestStatusAction ({ actionType, isCalling, isSuccess, isFail }) {
  try {
    yield put(GiggleActions.updateGiggleRequestStatus(actionType, isCalling, isSuccess, isFail))
  } catch (e) {
    console.warn(e)
  }
}

export function* restoreWallet ({ avatarCode, password, mnemonic }) {
  let routeName = ''

  try {
    yield walletRecovery({ avatarCode: avatarCode, password: password, mnemonic: mnemonic })

    const GiggleState = yield getState('giggle')

    if (GiggleState.isSuccessWalletRecovery) {
      result = yield walletRestore({ avatarCode: GiggleState.wallets[0].avatarCode, password: password })
      result = yield getBalance({ avatarCode: GiggleState.wallets[0].avatarCode, password: password })
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
    yield put(GiggleActions.updateGiggleRequestStatus('txSend', true, false, false))
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.txSend(RustState, price, 'smallest', note, -1, url)
    // console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('txSend', false, true, false))
    KeepAwake.deactivate()
  } catch (e) {
    console.warn(e)
    KeepAwake.deactivate()
    yield put(GiggleActions.updateGiggleRequestStatus('txSend', false, false, true))
  }
}

export function* listen () {
  try {
    const GiggleState = yield getState('giggle')
    const password = GiggleState.wallets[0].password
    const avatarCode = GiggleState.wallets[0].avatarCode
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const address_string = yield NativeModules.GrinBridge.myRelayAddress(RustState)
    console.log(address_string)
    // tn1-qtm44dth-236kmuu4js4k0m0-hfp2nshrxvx69lp-2ewn6lhtdgw7a95-ydgs9l
    const result = yield NativeModules.GrinBridge.listen(RustState)

    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRedux('isOnline', true))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRedux('isOnline', false))
  }
}
export function* relayAddressQuery ({ targetAvatarCode }) {
  console.log('call relayAddressQuery', targetAvatarCode)
  try {
    const GiggleState = yield getState('giggle')
    if (GiggleState.wallets.length === 0) {
      console.warn('wallet is empty')
    }
    const { avatarCode, password } = GiggleState.wallets[0]
    if (GiggleState.relayAddress) yield put(GiggleActions.updateGiggleRedux('relayAddress', null))
    yield put(GiggleActions.updateGiggleRequestStatus('relayAddressQuery', true, false, false))
    yield sleep(2000)
    const RustState = yield getRustStateJsonString(avatarCode, password)
    const result = yield NativeModules.GrinBridge.relayAddressQuery(RustState, targetAvatarCode)
    console.log('result=', result)
    yield put(GiggleActions.updateGiggleRequestStatus('relayAddressQuery', false, true, false))
    yield put(GiggleActions.updateGiggleRedux('relayAddress', result))
  } catch (e) {
    console.warn(e)
    yield put(GiggleActions.updateGiggleRequestStatus('relayAddressQuery', false, false, true))
  }
}

export function* sendTransaction ({ info }) {
  console.log('call sendTransaction', info)
  try {
    const GiggleState = yield getState('giggle')
    console.log('GiggleState', GiggleState)
    const password = GiggleState.wallets[0].password
    const avatarCode = GiggleState.wallets[0].avatarCode
    const price = parseInt(info.amount)

    console.log('price', price, GiggleState.relayAddress)
    yield put(GiggleActions.updateGiggleRequestStatus('txSend', true, false, false))
    yield txSend({ avatarCode, password: password, price: price, note: info.note, url: GiggleState.relayAddress })
    yield put(GiggleActions.updateGiggleRequestStatus('txSend', false, true, false))

    yield put(GiggleActions.addTransactionHistory({
      type: TRANSACTION_TYPE.SendSuccess,
      avatarCode: info.avatarCode,
      nickname: info.nickname,
      amount: price,
      note: info.note,
      date: Date.now()
    }))

    yield getBalance({ avatarCode, password })
    const action = NavigationActions.navigate({
      routeName: 'AskDone',
      params: {
        ...info
      },
      action: NavigationActions.navigate({ routeName: 'routeName' })
    })
    yield put(action)
  } catch (error) {
    yield put(WalletStatusActions.updateWalletStatusRedux('isSendTransactionFail', true))
    console.warn(error)
  }
}

export function* test () {
  console.log('test')
  // yield sleep(2000)
  // 85s8zd
  // yield listen()
  // yield listen({ avatarCode: 'ydgs9l', password: '11' })
  // yield getAllOutputs({ avatarCode: 'ydgs9l', password: '11' })
  // yield getAllTransactions({ avatarCode: 'ydgs9l', password: '11' })
  // yield relayAddressQuery({ targetAvatarCode: 'ydgs9l' })
}
