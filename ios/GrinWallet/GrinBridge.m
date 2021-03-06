// Copyright 2019 Ivan Sorokin.
//
// (Origin: https://github.com/cyclefortytwo/ironbelly/blob/master/ios/Ironbelly/GrinBridge.m )
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


#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(GrinBridge, NSObject)

RCT_EXTERN_METHOD(selectNearestNode:(NSString*)nodeApiHttpAddr resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(walletInit:(NSString*)state password:(NSString*)password is_12_phrases:(BOOL)is_12_phrases resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(walletPhrase:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(walletRecovery:(NSString*)state phrase:(NSString*)phrase resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(walletRestore:(NSString*)state startIndex:(uint64_t)startIndex batchSize:(uint64_t)batchSize resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(walletRepair:(NSString*)state startIndex:(uint64_t)startIndex batchSize:(uint64_t)batchSize updateOutputs:(BOOL)updateOutputs resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(checkPassword:(NSString*)state password:(NSString*)password resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(changePassword:(NSString*)state oldPassword:(NSString*)oldPassword  newPassword:(NSString*)newPassword resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(balance:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(height:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txsGet:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txGet:(NSString*)state txSlateId:(NSString*)txSlateId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txPost:(NSString*)state txSlateId:(NSString*)txSlateId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(listen:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(myRelayAddress:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(relayAddressQuery:(NSString*)state sixCode:(NSString*)sixCode resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txCreate:(NSString*)state amount:(uint64_t)amount selectionStrategy:(NSString*)selectionStrategy message:(NSString*)message targetSlateVersion:(int64_t)targetSlateVersion resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txSend:(NSString*)state amount:(uint64_t)amount selectionStrategy:(NSString*)selectionStrategy message:(NSString*)message targetSlateVersion:(int64_t)targetSlateVersion dest:(NSString*)dest resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txCancel:(NSString*)state txSlateId:(NSString*)txSlateId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txReceive:(NSString*)state slateFilePath:(NSString*)slateFilePath message:(NSString*)message resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(txFinalize:(NSString*)state slateFilePath:(NSString*)slateFilePath resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(outputsGet:(NSString*)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
