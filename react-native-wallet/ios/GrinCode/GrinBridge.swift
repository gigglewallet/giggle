// Copyright 2019 Ivan Sorokin.
//
// (Origin: https://github.com/cyclefortytwo/ironbelly/blob/master/ios/Ironbelly/GrinBridge.swift )
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
import Result
import ObjectMapper
import SwiftyJSON

func handleCResult(error: UInt8,
                   cResult: UnsafePointer<Int8>,
                   resolve: RCTPromiseResolveBlock,
                   reject: RCTPromiseRejectBlock
  ) -> Void {
    let result = String(cString: cResult)
    cstr_free(cResult)
    //NSLog("grin wallet api returned: %@, error: %d", result, error)
    switch error {
    case 0:
        resolve(result)
    case 2:
        //todo: "not validated!"
        resolve(result)
    default:
        reject(nil, result, nil)
    }
}

@objc(GrinBridge)
class GrinBridge: NSObject {
  
    @objc static func requiresMainQueueSetup() -> Bool {
      return false
    }
  
    @objc public func walletInit(_ state: String, password: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_init(state, password, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc public func walletPhrase(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_get_wallet_mnemonic(state, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc public func walletRecovery(_ state: String, phrase: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_init_recover(state, phrase, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc public func walletRestore(_ state: String, start_index: UInt64, batch_size: UInt64, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_restore(state, start_index, batch_size, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }

    @objc public func walletRepair(_ state: String, start_index: UInt64, batch_size: UInt64, update_outputs: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_check(state, start_index, batch_size, update_outputs, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func checkPassword(_ state:String, password: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_check_password(state, password, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc public func balance(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_get_balance(state, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc public func height(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_chain_height(state, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }

    @objc public func txsGet(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_txs_retrieve(state, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txGet(_ state: String, txSlateId: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_tx_retrieve(state, txSlateId, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txCreate(_ state: String, amount: UInt64, selectionStrategy: String, message: String, target_slate_version: Int16, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_init_tx(state, amount, selectionStrategy, target_slate_version, message, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txCancel(_ state: String, id: UInt32, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_cancel_tx(state, id, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txReceive(_ state: String, slateFilePath: String, message: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_tx_file_receive(state, slateFilePath, message, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txFinalize(_ state: String, slateFilePath: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_tx_file_finalize(state, slateFilePath, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txSend(_ state: String, amount: UInt64, selectionStrategy: String, message: String, target_slate_version: Int16, dest:String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_send_tx(state, amount, dest, selectionStrategy, target_slate_version, message, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func txPost(_ state: String, txSlateId: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_post_tx(state, txSlateId, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func outputsGet(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_outputs_retrieve(state, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc public func outputGet(_ state: String, txId: UInt32, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_output_retrieve(state, txId, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }    
}
