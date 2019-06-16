// Copyright © 2019 vite labs.
//
// ( Origin from https://github.com/vitelabs/Vite_GrinWallet/blob/master/Vite_GrinWallet/Classes/GrinTypes.swift
//   And refactored & optimized & enhanced by Gotts Developers: https://github.com/gottstech.
// )
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

import Foundation
import ObjectMapper

public struct MobileWalletCfg: Mappable {
    public var account: String?
    public var chain_type: String?
    public var data_dir: String?
    public var node_api_addr: String?
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        account <- map["account"]
        chain_type <- map["chain_type"]
        data_dir <- map["data_dir"]
        node_api_addr <- map["node_api_addr"]
    }
    
    public init(account: String?, chain_type: String?, data_dir: String?, node_api_addr: String?) {
        self.account = account
        self.chain_type = chain_type
        self.data_dir = data_dir
        self.node_api_addr = node_api_addr
    }
}

class JSONStringToIntTransform: TransformType {
    
    typealias Object = UInt64
    typealias JSON = String
    
    init() {}
    func transformFromJSON(_ value: Any?) -> UInt64? {
        if let strValue = value as? String {
            return UInt64(strValue)
        }
        return value as? UInt64 ?? nil
    }
    
    func transformToJSON(_ value: UInt64?) -> String? {
        if let intValue = value {
            return "\(intValue)"
        }
        return nil
    }
}

public struct WalletInfo: Mappable {
    /// height from which info was taken
    public var lastConfirmedHeight: UInt64 = 0
    /// minimum confirmations
    public var minimumConfirmations: UInt64 = 0
    /// total amount in the wallet
    public var total: UInt64 = 0
    /// amount awaiting finalization
    public var amountAwaitingFinalization: UInt64 = 0
    /// amount awaiting confirmation
    public var amountAwaitingConfirmation: UInt64 = 0
    /// coinbases waiting for lock height
    public var amountImmature: UInt64 = 0
    /// amount currently spendable
    public var amountCurrentlySpendable: UInt64 = 0
    /// amount locked via previous transactions
    public var amountLocked: UInt64 = 0
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        lastConfirmedHeight <- (map["last_confirmed_height"], JSONStringToIntTransform())
        minimumConfirmations <- (map["minimum_confirmations"], JSONStringToIntTransform())
        total <- (map["total"], JSONStringToIntTransform())
        amountAwaitingFinalization <- (map["amount_awaiting_finalization"], JSONStringToIntTransform())
        amountAwaitingConfirmation <- (map["amount_awaiting_confirmation"], JSONStringToIntTransform())
        amountImmature <- (map["amount_immature"], JSONStringToIntTransform())
        amountCurrentlySpendable <- (map["amount_currently_spendable"], JSONStringToIntTransform())
        amountLocked <- (map["amount_locked"], JSONStringToIntTransform())
    }
}

public struct BatchProgress: Mappable {
    /// Highest PMMR index
    public var highestIndex: UInt64 = 0
    /// Last retrieved index
    public var lastRetrievedIndex: UInt64 = 0
    
    public init(highestIndex: UInt64, lastRetrievedIndex: UInt64) {
        self.highestIndex = highestIndex
        self.lastRetrievedIndex = lastRetrievedIndex
    }
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        highestIndex <- map["highestIndex"]
        lastRetrievedIndex <- map["lastRetrievedIndex"]
    }
}

/// Types of transactions that can be contained within a TXLog entry
public enum TxLogEntryType: String {
    
    /// A coinbase transaction becomes confirmed
    case confirmedCoinbase = "ConfirmedCoinbase"
    /// Outputs created when a transaction is received
    case txReceived = "TxReceived"
    /// Inputs locked + change outputs when a transaction is created
    case txSent = "TxSent"
    /// Received transaction that was rolled back by user
    case txReceivedCancelled = "TxReceivedCancelled"
    /// Sent transaction that was rolled back by user
    case txSentCancelled = "TxSentCancelled"
}


public struct TxLogEntry: Mappable {
    /// BIP32 account path used for creating this tx
    public var parent_key_id: String = ""
    /// Local id for this transaction (distinct from a slate transaction id)
    public var id: UInt32 = 0
    /// Slate transaction this entry is associated with, if any
    public var txSlateId: String?
    /// Transaction type (as above)
    public var txType: TxLogEntryType!
    /// Time this tx entry was created
    public var creationTs: String  = ""
    /// Time this tx was confirmed (by this wallet)
    public var confirmationTs: String?
    /// Whether the inputs+outputs involved in this transaction have been
    /// confirmed (In all cases either all outputs involved in a tx should be
    /// confirmed, or none should be; otherwise there's a deeper problem)
    public var confirmed: Bool!
    /// number of inputs involved in TX
    public var numInputs: Int = 0
    /// number of outputs involved in TX
    public var numOutputs: Int  = 0
    /// Amount credited via this transaction
    public var amountCredited: UInt64?
    /// Amount debited via this transaction
    public var amountDebited: UInt64?
    /// Fee
    public var fee: UInt64?
    /// Message data, stored as json
    public var messages: [String: [ParticipantMessageData]]?
    /// Location of the store transaction, (reference or resending)
    public var storedTx: String?
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        parent_key_id <- map["parent_key_id"]
        id <- map["id"]
        txSlateId <- map["tx_slate_id"]
        txType <- map["tx_type"]
        creationTs <- map["creation_ts"]
        confirmationTs <- map["confirmation_ts"]
        confirmed <- map["confirmed"]
        numInputs <- map["num_inputs"]
        numOutputs <- map["num_outputs"]
        amountCredited <- map["amount_credited"]
        amountDebited <- map["amount_debited"]
        fee <- map["fee"]
        messages <- map["messages"]
        storedTx <- map["stored_tx"]
    }
}

public struct ParticipantMessageData {
    /// id of the particpant in the tx
    public var id: Int
    /// Public key
    public var public_key: String
    /// Message,
    public var message: String?
    /// Signature
    public var message_sig: String?
}

public struct Slate: Mappable {
    /// Versioning info, stored as json
    public var version_info: VersionCompatInfo!
    /// The number of participants intended to take part in this transaction
    public var numParticipants: Int = 0
    /// Unique transaction ID, selected by sender
    public var slateId: String = ""
    /// The core transaction data:
    /// inputs, outputs, kernels, kernel offset
    public var tx: [String: Any] = [:]
    /// base amount (excluding fee)
    public var amount: UInt64 = 0
    /// fee amount
    public var fee: UInt64 = 0
    /// Block height for the transaction
    public var height: UInt64 = 0
    /// Lock height
    public var lockHeight: UInt64 = 0
    /// Participant data, each participant in the transaction will
    /// insert their public data here. For now, 0 is sender and 1
    /// is receiver, though this will change for multi-party
    public var participantData: [Any] = []
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        version_info <- map["version_info"]
        numParticipants <- map["num_participants"]
        slateId <- map["id"]
        tx <- map["tx"]
        amount <- (map["amount"], JSONStringToIntTransform())
        fee <- (map["fee"], JSONStringToIntTransform())
        height <- (map["height"], JSONStringToIntTransform())
        lockHeight <- (map["lock_height"], JSONStringToIntTransform())
        participantData <- map["participant_data"]
    }
}

public struct VersionCompatInfo: Mappable {
    /// The current version of the slate format
    public var version: Int = 0
    /// Original version this slate was converted from
    public var orig_version: Int = 0
    /// The grin block header version this slate is intended for
    public var block_header_version: Int = 0
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        version <- map["version"]
        orig_version <- map["orig_version"]
        block_header_version <- map["block_header_version"]
    }
}

public struct ParticipantData {
    /// Id of participant in the transaction. (For now, 0=sender, 1=rec)
    public var id: Int
    /// Public key corresponding to private blinding factor
    public var public_blind_excess: [Int]
    /// Public key corresponding to private nonce
    public var public_nonce: [Int]
    /// Public partial signature
    public var part_sig: [Int]?
    /// A message for other participants
    public var message: String?
    /// Signature, created with private key corresponding to 'public_blind_excess'
    public var message_sig: [Int]?
}

public enum OutputStatus: String {
    /// Unconfirmed
    case unconfirmed
    /// Unspent
    case unspent
    /// Locked
    case locked
    /// Spent
    case spent
    /// Confirmed
    case confirmed
}

/// Information about an output that's being tracked by the wallet. Must be
/// enough to reconstruct the commitment associated with the ouput when the
/// root private key is known.

public struct OutputData: Mappable {
    /// Root key_id that the key for this output is derived from
    public var root_key_id: String = ""
    /// Derived key for this output
    public var key_id: String = ""
    /// How many derivations down from the root key
    public var n_child: UInt32 = 0
    /// The actual commit, optionally stored
    public var commit: String?
    /// PMMR Index, used on restore in case of duplicate wallets using the same
    /// key_id (2 wallets using same seed, for instance
    public var mmr_index: UInt64?
    /// Value of the output, necessary to rebuild the commitment
    public var value: UInt64  = 0
    /// Current status of the output
    public var status: OutputStatus = .unconfirmed
    /// Height of the output
    public var height: UInt64  = 0
    /// Height we are locked until
    public var lock_height: UInt64 = 0
    /// Is this a coinbase output? Is it subject to coinbase locktime?
    public var is_coinbase: Bool = false
    /// Optional corresponding internal entry in tx entry log
    public var tx_log_entry: UInt32?
    /// Unique transaction ID, selected by sender
    public var slate_id: String = ""
    
    public init?(map: Map) { }
    
    public mutating func mapping(map: Map) {
        root_key_id <- map["root_key_id"]
        key_id <- map["key_id"]
        n_child <- map["n_child"]
        commit <- map["commit"]
        mmr_index <- map["mmr_index"]
        value <- map["value"]
        status <- map["status"]
        height <- map["height"]
        lock_height <- map["lock_height"]
        is_coinbase <- map["is_coinbase"]
        tx_log_entry <- map["tx_log_entry"]
        slate_id <- map["slate_id"]
    }
}

public struct GrinWalletError: Error {
    public let code: Int
    public let message: String
}

public enum GrinChainType: String {
    case floonet
    case mainnet
}
