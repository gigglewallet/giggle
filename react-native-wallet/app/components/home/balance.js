// Copyright 2019 Giggle Developers
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NativeModules } from 'react-native'
import moment from 'moment'
import { getStateForRust, mapRustBalance } from 'common'
import {
    type Balance,
    type RustBalance,
    type Error,
} from 'common/types'

const { GrinBridge } = NativeModules

export type State = {
    data: Balance,
    error: ?Error,
}

const initialState: State = {
    data: {
        amountAwaitingConfirmation: 0,
        amountCurrentlySpendable: 0,
        amountImmature: 0,
        amountLocked: 0,
        lastConfirmedHeight: 0,
        minimumConfirmations: 0,
        total: 0,
    },
    loading: false,
    error: null,
    lastUpdated: null,
}

// export const sideEffects = {
//     ['BALANCE_REQUEST']: (action: balanceRequestAction, store: Store) => {
//         return GrinBridge.balance(getStateForRust(store.getState()), true)
//             .then((jsonBalance: string) => JSON.parse(jsonBalance))
//             .then((data: RustBalance) => {
//                 store.dispatch({ type: 'BALANCE_SUCCESS', data: mapRustBalance(data) })
//             })
//             .catch(error => {
//                 store.dispatch({ type: 'BALANCE_FAILURE', code: 1, message: error })
//                 log(error, true)
//             })
//     },
// }
