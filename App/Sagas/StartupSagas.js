import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'
import { NavigationActions } from 'react-navigation'
import GiggleActions from '../Redux/GiggleRedux'
// exported to make available for tests
import { Loading, EasyLoading } from 'react-native-easy-loading'
// process STARTUP actions

function * getState (name) {
  const result = yield select(state => state[name])
  return result
}

export function * startup (action) {
  console.log('call startup')
  const GiggleState = yield getState('giggle')
  const currentWallet = GiggleState.currentWallet
  let routeName = 'Login'
  yield put(GiggleActions.clearTransaction())
  yield put(GiggleActions.listen())
  if (currentWallet.avatarCode) {
    routeName = 'Login'
  } else {
    routeName = 'SignUp'
  }
  let redirect = NavigationActions.navigate({
    routeName: routeName,
    params: {},
    action: NavigationActions.navigate({ routeName: routeName })
  })
  EasyLoading.dismis()
  yield put(redirect)
}
