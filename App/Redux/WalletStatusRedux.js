import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateWalletStatusRedux: ['key', 'value']
})

export const WalletStatusTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isPressedAskBtn: false,
  isEnoughBalance: true,
  isSendTransactionFail: false
})

/* ------------- Reducers ------------- */
export const updateWalletStatusRedux = (state, { key, value }) => {
  let data = {}
  data[key] = value
  console.log(data)
  return state.merge(data)
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_WALLET_STATUS_REDUX]: updateWalletStatusRedux

})
