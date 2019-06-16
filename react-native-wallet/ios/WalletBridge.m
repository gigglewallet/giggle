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


#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(GrinBridge, NSObject)

RCT_EXTERN_METHOD(init: (Booo)isMainnet (String)walletUrl (String)password)

RCT_EXTERN_METHOD(walletRecovery: (String)phrase)

@end
