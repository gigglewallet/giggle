// Copyright © 2019 vite labs.
//
// ( Origin from https://github.com/vitelabs/Vite_GrinWallet/blob/master/Vite_GrinWallet/Classes/GrinBridge.swift
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
import Result
import ObjectMapper
import SwiftyJSON

func handleCResult(error: UInt8, cResult: UnsafePointer<Int8>) -> Result<String, GrinWalletError> {
    let result = String(cString: cResult)
    cstr_free(cResult)
    switch error {
    case 0:
        return .success(result)
    case 2:
        print("not validated!")
        return .success(result)
    default:
        return .failure(GrinWalletError(code: Int(error), message: result))
    }
}

@objc(GrinBridge)
class GrinBridge: NSObject {
  
  override init() {
    super.init()
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  public init(isMainnet: Bool, walletUrl: String,  password: String) {
        super.init()
        self.walletUrl = URL.init(fileURLWithPath: walletUrl)
        if isMainnet {
          self.chainType = "mainnet"
        } else {
          self.chainType = "floonet"
        }
        self.password = password
        self.checkDirectories()
        self.checkApiSecret()
    }
    
    open var chainType: String = "mainnet"
    open var walletUrl: URL!
    open var password: String = ""
    open var checkNodeApiHttpAddr = "http://127.0.0.1:13413/"
    open var apiSecret = ""
    open var account = "default"
    lazy var paresDataError = GrinWalletError(code: -1, message: "paresDataError")
    
    public func getWalletCfg() -> MobileWalletCfg {
        return MobileWalletCfg(account: self.account, chain_type: self.chainType, data_dir: self.walletUrl?.path, node_api_addr: self.checkNodeApiHttpAddr)
    }
    
    public func walletExists() -> Bool {
        let path = walletUrl!.path + "/wallet_data/wallet.seed"
        return FileManager.default.fileExists(atPath:path)
    }
    
    public func walletInfo() -> Result<WalletInfo, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_get_balance(getWalletCfg().toJSONString(), password, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                if let walletInfo = WalletInfo(JSONString: $0) {
                    return .success(walletInfo)
                } else {
                    return .failure(paresDataError)
                }
        }
    }
    
    public func txsGet() -> Result<(refreshed:Bool, txLogEntries:[TxLogEntry]), GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_txs_retrieve(getWalletCfg().toJSONString(), password, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                guard let jsonArray = JSON(parseJSON: $0).array,
                    let refreshed = jsonArray.first?.bool,
                    let txLogEntries =  Mapper<TxLogEntry>().mapArray(JSONObject: jsonArray.last?.arrayObject) else {
                        return .failure(paresDataError)
                }
                return .success((refreshed, txLogEntries))
        }
    }
    
    public func txGet(txSlateId: String?) -> Result<(refreshed:Bool, txLogEntry:TxLogEntry), GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_tx_retrieve(getWalletCfg().toJSONString(), password, txSlateId, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                if let jsonArray = JSON(parseJSON: $0).array,
                    let refreshed = jsonArray.first?.bool,
                    let dictionaryObject = jsonArray.last?.array?.first?.dictionaryObject,
                    let txLogEntry = TxLogEntry(JSON: dictionaryObject) {
                    return .success((refreshed, txLogEntry))
                } else {
                    return .failure(paresDataError)
                }
        }
    }
    
    public func txCreate(amount: UInt64, selectionStrategy: String, message: String, target_slate_version: Int16) -> Result<Slate, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_init_tx(getWalletCfg().toJSONString(), password, amount, selectionStrategy, target_slate_version, message, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                if let slate = Slate(JSONString:$0) {
                    return .success(slate)
                } else {
                    return .failure(paresDataError)
                }
        }
    }
    
    public func txCancel(id: UInt32) -> Result<Void, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_cancel_tx(getWalletCfg().toJSONString(), password, id, &error)
        return handleCResult(error:error, cResult:cResult!).map { _ in ()}
    }
    
    public func txReceive(slateFilePath: String, message: String) -> Result<Slate, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_tx_file_receive(getWalletCfg().toJSONString(), password, slateFilePath, message, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                if let slate = Slate(JSONString:$0) {
                    return .success(slate)
                } else {
                    return .failure(paresDataError)
                }
        }
    }
    
    public func txFinalize(slateFilePath: String) -> Result<String, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_tx_file_finalize(getWalletCfg().toJSONString(), password, slateFilePath, &error)
        return handleCResult(error:error, cResult:cResult!)
    }
    
    public func txSend(amount: UInt64, selectionStrategy: String, message: String, dest:String, target_slate_version: Int16) -> Result<String, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_send_tx(getWalletCfg().toJSONString(), password, amount, dest, selectionStrategy, target_slate_version, message, &error)
        return handleCResult(error:error, cResult:cResult!)
    }
    
    public func txPost(txSlateId: String) -> Result<String, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_post_tx(getWalletCfg().toJSONString(), password, txSlateId, &error)
        return handleCResult(error:error, cResult:cResult!)
    }
    
    public func walletInit() -> Result<String, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_wallet_init(getWalletCfg().toJSONString(), password, &error)
        return handleCResult(error:error, cResult:cResult!)
    }
    
    public func walletPhrase() -> Result<String, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_get_wallet_mnemonic(getWalletCfg().toJSONString(), password, &error)
        return handleCResult(error:error, cResult:cResult!)
    }

    public func walletRecovery(phrase: String) -> Result<String, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_wallet_init_recover(getWalletCfg().toJSONString(), phrase, self.password, &error)
        return handleCResult(error:error, cResult:cResult!)
    }

    public func walletCheck(start_index: UInt64, batch_size: UInt64) -> Result<BatchProgress, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_wallet_check(getWalletCfg().toJSONString(), password, start_index, batch_size, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                if let progress = BatchProgress(JSONString: $0) {
                    return .success(progress)
                } else {
                    return .failure(paresDataError)
                }
        }
    }

    public func walletRestore(start_index: UInt64, batch_size: UInt64) -> Result<BatchProgress, GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_wallet_restore(getWalletCfg().toJSONString(), password, start_index, batch_size, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                if let progress = BatchProgress(JSONString: $0) {
                    return .success(progress)
                } else {
                    return .failure(paresDataError)
                }
        }
    }
    
    public func height() -> Result<(Bool, Int), GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_chain_height(getWalletCfg().toJSONString(), password, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                guard let jsonArray = JSON(parseJSON: $0).array,
                    let refreshed = jsonArray.last?.bool,
                    let height =  jsonArray.first?.int else {
                        return .failure(paresDataError)
                }
                return .success((refreshed, height))
        }
    }
    
    public func outputsGet() -> Result<(refreshed:Bool, outputs:[(OutputData,[Int])]), GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_outputs_retrieve(getWalletCfg().toJSONString(), password, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                guard let jsonArray = JSON(parseJSON: $0).array,
                    let refreshed = jsonArray.first?.bool,
                    let infoArray = jsonArray.last?.arrayObject as? [[Any]]else {
                        return .failure(paresDataError)
                }
                let infos = infoArray.compactMap { (data: [Any]) -> (OutputData,[Int])? in
                    if let outputDict = data.first as? [String: Any],
                        let commitment = data.last as? [Int],
                        let output = OutputData(JSON: outputDict) {
                        return (output, commitment)
                    } else {
                        return nil
                    }
                }
                return .success((refreshed,infos))
        }
    }
    
    public func outputGet(txId: UInt32) -> Result<(refreshed:Bool, outputs:[(OutputData,[Int])]), GrinWalletError> {
        var error: UInt8 = 0
        let cResult = grin_output_retrieve(getWalletCfg().toJSONString(), password, txId, &error)
        return handleCResult(error:error, cResult:cResult!)
            .flatMap {
                guard let jsonArray = JSON(parseJSON: $0).array,
                    let refreshed = jsonArray.first?.bool,
                    let infoArray = jsonArray.last?.arrayObject as? [[Any]]else {
                        return .failure(paresDataError)
                }
                let infos = infoArray.compactMap { (data: [Any]) -> (OutputData,[Int])? in
                    if let outputDict = data.first as? [String: Any],
                        let commitment = data.last as? [Int],
                        let output = OutputData(JSON: outputDict) {
                        return (output, commitment)
                    } else {
                        return nil
                    }
                }
                return .success((refreshed,infos))
        }
    }
    
    public func isResponseSlate(slatePath: String) -> Bool {
        return slatePath.components(separatedBy: ".").last == "response" || slatePath.contains("response")
    }
    
    public func getSlateUrl(slateId: String, isResponse: Bool) -> URL {
        let path = "\(walletUrl!.path)/slates/\(slateId).grinslate\(isResponse ? ".response" : "")"
        return URL(fileURLWithPath: path)
    }
    
    public func checkApiSecret() {
        let url =  walletUrl?.appendingPathComponent(".api_secret")
        let exists = FileManager.default.fileExists(atPath: url!.path)
        if !exists {
            do {
                try apiSecret.write(to: url!, atomically: true, encoding: .utf8)
            } catch {
                print(error)
            }
        }
    }
    
    public func checkDirectories() {
        let walletDataUrl = walletUrl!.appendingPathComponent("wallet_data")
        let slatesUrl = walletUrl!.appendingPathComponent("slates")
        for url in [walletUrl, walletDataUrl, slatesUrl] {
            if !FileManager.default.fileExists(atPath: url!.path) {
                do {
                    try FileManager.default.createDirectory(at: url!, withIntermediateDirectories: true, attributes: nil)
                } catch {
                    print(error)
                }
            }
        }
    }
}
