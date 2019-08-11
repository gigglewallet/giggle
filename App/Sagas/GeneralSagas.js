import { call, put } from 'redux-saga/effects'
import GeneralActions from '../Redux/GeneralRedux'
import { AsyncStorage } from 'react-native'
export function * getGeneralInfo (api, action) {
  yield put(GeneralActions.generalInfoRequest())
  const response = yield call(api.getGeneralInfo)
  if (response.status) {
    yield put(GeneralActions.generalInfoSuccess(response.info))
  } else {
    yield put(GeneralActions.generalInfoFailure())
  }
}

export function * getLaunchInfo (api, action) {
  yield put(GeneralActions.launchInfoRequest())
  const response = yield call(api.launchInfoRequest)
  if (response.status) {
    // do data conversion here if needed
    yield put(GeneralActions.launchInfoSuccess(response.info))
  } else {
    console.log('error message:', response.msg)
    yield put(GeneralActions.launchInfoFailure())
  }
}

export function * clearStorage (api, action) {
  try {
    yield AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}
