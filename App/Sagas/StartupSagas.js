import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'
import { NavigationActions } from 'react-navigation'
// exported to make available for tests

// process STARTUP actions

function* getState (name) {
  const result = yield select(state => state[name])
  return result
}


export function* startup (action) {
  console.log('call startup')
  const GiggleState = yield getState('giggle')
  const currentWallet = GiggleState.currentWallet
  let routeName = 'Login'
  console.log(currentWallet.avatarCode)
  if (currentWallet.avatarCode) {
    routeName = 'Login'
  } else {
    routeName = 'SignUp'
  }

  //routeName = 'MyAvatars'
  let redirect = NavigationActions.navigate({
    routeName: routeName,
    params: {},
    action: NavigationActions.navigate({ routeName: routeName })
  })

  yield put(redirect)

}
