import { put, select } from 'redux-saga/effects'
import AppConfig from '../Config/AppConfig'
import { NativeModules } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { ERROR_TYPE } from '../Modules/CommonType'
import WalletStatusActions from '../Redux/WalletStatusRedux'
import { NavigationActions } from 'react-navigation'
import { TRANSACTION_TYPE, GRIN_UNIT } from '../Modules/CommonType'
import KeepAwake from 'react-native-keep-awake'
import { TRANSACTION_METHOD } from '../Modules/CommonType'
import { AsyncStorage } from 'react-native'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function* getState (name) {
  const result = yield select(state => state[name])
  return result
}

export function* updateGiggleRequestStatusAction ({ actionType, isCalling, isSuccess, isFail }) {
  try {
    yield put(WalletStatusActions.updateGiggleRequestStatus(actionType, isCalling, isSuccess, isFail))
  } catch (e) {
    console.warn(e)
  }
}
