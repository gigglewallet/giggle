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


export type State = {
    node_api_addr: string,
    chain_type: 'floonet' | 'mainnet',
    minimumConfirmations: number,
}

export const MAINNET_CHAIN = 'mainnet'
export const MAINNET_API_SECRET = 'V6JvDqb6GddgIcfqn8tL'
export const MAINNET_DEFAULT_NODE = 'https://sga.grin.icu:3413'

export const FLOONET_CHAIN = 'floonet'
export const FLOONET_API_SECRET = 'ZbiQCN85Srih3f27PJXH'
export const FLOONET_DEFAULT_NODE = 'https://sga.grin.icu:13413'

export const initialState: State = {
    node_api_addr: FLOONET_DEFAULT_NODE,
    chain_type: FLOONET_CHAIN,
    minimumConfirmations: 10,
}

