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
        //NSLog("grin wallet api returned error: %@", result)
        reject(nil, result, nil)
    }
}

@objc(GrinBridge)
class GrinBridge: NSObject {
  
    @objc static func requiresMainQueueSetup() -> Bool {
      return false
    }
  
    @objc func selectNearestNode(_ nodeApiHttpAddr: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = select_nearest_node(nodeApiHttpAddr, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }

  @objc func walletInit(_ state: String, password: String, is_12_phrases: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_init(state, password, is_12_phrases, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func walletPhrase(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_get_wallet_mnemonic(state, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func walletRecovery(_ state: String, phrase: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_init_recover(state, phrase, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func walletRestore(_ state: String, startIndex: UInt64, batchSize: UInt64, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_restore(state, startIndex, batchSize, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }

    @objc func walletRepair(_ state: String, startIndex: UInt64, batchSize: UInt64, updateOutputs: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_check(state, startIndex, batchSize, updateOutputs, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func checkPassword(_ state:String, password: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_check_password(state, password, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func changePassword(_ state:String, oldPassword: String, newPassword: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_wallet_change_password(state, oldPassword, newPassword, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }

    @objc func balance(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_get_balance(state, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func height(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_chain_height(state, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }

    @objc func txsGet(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_txs_retrieve(state, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txGet(_ state: String, txSlateId: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_tx_retrieve(state, txSlateId, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func listen(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_listen(state, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func myRelayAddress(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = my_grin_relay_addr(state, &error)
      handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
  
    @objc func relayAddressQuery(_ state: String, sixCode: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      var error: UInt8 = 0
      let cResult = grin_relay_addr_query(state, sixCode, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txCreate(_ state: String, amount: UInt64, selectionStrategy: String, message: String, targetSlateVersion: Int64, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let targetSlateVersionI16: Int16 = Int16(targetSlateVersion)
        let cResult = grin_init_tx(state, amount, selectionStrategy, targetSlateVersionI16, message, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txCancel(_ state: String, txSlateId: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_cancel_tx(state, txSlateId, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txReceive(_ state: String, slateFilePath: String, message: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_tx_file_receive(state, slateFilePath, message, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txFinalize(_ state: String, slateFilePath: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_tx_file_finalize(state, slateFilePath, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txSend(_ state: String, amount: UInt64, selectionStrategy: String, message: String, targetSlateVersion: Int64, dest:String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let targetSlateVersionI16: Int16 = Int16(targetSlateVersion)
        let cResult = grin_send_tx(state, amount, dest, selectionStrategy, targetSlateVersionI16, message, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func txPost(_ state: String, txSlateId: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_post_tx(state, txSlateId, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
    
    @objc func outputsGet(_ state: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        var error: UInt8 = 0
        let cResult = grin_outputs_retrieve(state, &error)
        handleCResult(error:error, cResult:cResult!, resolve: resolve, reject: reject)
    }
}
