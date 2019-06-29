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

import RNFetchBlob from 'rn-fetch-blob'
import { type State, type RustState, } from 'types'

export const getStateForRust = (state: State): string => {
    const result: RustState = {
        account: 'default',
        chain_type: state.settings.chain_type,
        data_dir: RNFetchBlob.fs.dirs,
        node_api_addr: state.settings.checkNodeApiHttpAddr,
        password: 'my-wallet-password', //todo: to be stored in wallet state
        minimum_confirmations: state.settings.minimumConfirmations,
    }
    return JSON.stringify(result)
}

