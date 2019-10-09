import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getGeneralInfo: null,
  getLaunchInfo: null,
  generalInfoRequest: null,
  generalInfoSuccess: ['generalInfo'],
  generalInfoFail: null,
  launchInfoRequest: null,
  launchInfoSuccess: ['launchInfo'],
  launchInfoFail: null,
  clearStorage: null,
  logout: null
})

export const GeneralTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  generalInfo: null,
  fetchingGeneralInfo: null,
  errorGeneralInfo: null,
  launchInfo: null,
  fetchingLaunchInfo: null,
  errorLaunfhInfo: null
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GENERAL_INFO_REQUEST]: generalInfoRequest,
  [Types.GENERAL_INFO_SUCCESS]: generalInfoSuccess,
  [Types.GENERAL_INFO_FAIL]: generalInfoFailure,
  [Types.LAUNCH_INFO_REQUEST]: launchInfoRequest,
  [Types.LAUNCH_INFO_SUCCESS]: launchInfoSuccess,
  [Types.LAUNCH_INFO_FAIL]: launchInfoFailure
})
