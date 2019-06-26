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

import { type State as BalanceState } from 'common/balance'
import { type State as SettingsState } from 'common/settings'

export type Balance = {
    amountAwaitingConfirmation: number,
    amountAwaitingFinalization: number,
    amountCurrentlySpendable: number,
    amountImmature: number,
    amountLocked: number,
    lastConfirmedHeight: number,
    minimumConfirmations: number,
    total: number,
}

export const mapRustBalance = (rB: RustBalance): Balance => {
    return {
        amountAwaitingConfirmation: rB.amount_awaiting_confirmation,
        amountAwaitingFinalization: rB.amount_awaiting_finalization,
        amountCurrentlySpendable: rB.amount_currently_spendable,
        amountImmature: rB.amount_immature,
        amountLocked: rB.amount_locked,
        lastConfirmedHeight: rB.last_confirmed_height,
        minimumConfirmations: rB.minimum_confirmations,
        total: rB.total,
    }
}

export type State = {
    settings: SettingsState,
    balance: BalanceState,
}
export type GetState = () => State

// Rust structures

export type RustState = {
    account?: string,
    chain_type: string,
    data_dir: string,
    node_api_addr: string,
    password?: string,
}

export type RustBalance = {
    amount_awaiting_confirmation: number,
    amount_awaiting_finalization: number,
    amount_currently_spendable: number,
    amount_immature: number,
    amount_locked: number,
    last_confirmed_height: number,
    minimum_confirmations: number,
    total: number,
}


// ---

export type Error = {
    code: number,
    message: string,
}
