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

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './app/reducers'
import AppNavigation from './app/navigation/AppNavigation'
import RNFetchBlob from 'rn-fetch-blob'
import {NativeModules} from "react-native"

import { type RustState,RustBalance,RustTx,RustOutput,Slate,mapRustBalance } from './app/common/types'

export default class App extends Component {
  configureStore = createStore()

  // Gary+ Just a demo here for Grin Wallet RN APIs
  async componentDidMount(): void {
    console.debug( 'componentDidMount call' )

    let walletState: RustState = {
      account: 'default',
      chain_type: 'floonet',
      data_dir: RNFetchBlob.fs.dirs.DocumentDir + '/wallet_1',
      node_api_addr: 'https://nodes.grin.icu:13413',
      node_api_secret: 'ZbiQCN85Srih3f27PJXH',
      password: 'your-password',
      minimum_confirmations: 10,
    }

    // wallet 1/2/3/4 clean-up if exist
    const dir1 = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_1';
    await RNFetchBlob.fs.isDir(dir1)
      .then((isDir) => {
          RNFetchBlob.fs.unlink(dir1)
      });

    const dir2 = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_2';
    await RNFetchBlob.fs.isDir(dir2)
      .then((isDir) => {
          RNFetchBlob.fs.unlink(dir2)
      });

    const dir3 = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_3';
    await RNFetchBlob.fs.isDir(dir3)
      .then((isDir) => {
          RNFetchBlob.fs.unlink(dir3)
      });

    const dir4 = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_4';
    await RNFetchBlob.fs.isDir(dir4)
      .then((isDir) => {
          RNFetchBlob.fs.unlink(dir4)
      });

    //--- Preparation
    await NativeModules.GrinBridge.selectNearestNode(walletState.node_api_addr)
        .then(best_node_api_addr => {
          walletState.node_api_addr = best_node_api_addr;
          console.debug('selectNearestNode got: ' + best_node_api_addr);
        })
        .catch(error => {
          console.debug('selectNearestNode fail: ' + error)
        });

    //--- Demo 1.1: How to create a new wallet
    console.debug('--------- -------- demo 1.1 -------- --------')
    await NativeModules.GrinBridge.walletInit(JSON.stringify(walletState), walletState.password, false)
    console.debug( 'wallet_1 data directory: ' + walletState.data_dir )

    const wallet1Mnemonic = await NativeModules.GrinBridge.walletPhrase(JSON.stringify(walletState))
    console.debug( 'wallet_1 mnemonic phrases: ' + wallet1Mnemonic )

    //--- Demo 1.2: How to listen on Grin Relay for receiving
    console.debug('--------- -------- demo 1.2 -------- --------')
    await NativeModules.GrinBridge.listen(JSON.stringify(walletState))

    //--- Demo 1.3: How to query current Grin Relay address (bech32 address string)
    console.debug('--------- -------- demo 1.3 -------- --------')
    const data = await NativeModules.GrinBridge.myRelayAddress(JSON.stringify(walletState))
    console.debug( 'wallet_1 grin relay address: ' + data )

    console.debug('--------- -------- demo 1.4 -------- --------')
    //--- Demo 1.4 : How to get current chain height
    {
      await NativeModules.GrinBridge.height(JSON.stringify(walletState))
          .then( height => {
              console.debug('get height ok. height=' + height)
          })
          .catch(error => {
              console.debug('get height fail: ' + error)
          });
    }

    console.debug('--------- -------- demo 1.5 -------- --------');
    //--- Demo 1.5: How to query the full relay address on a 6-code short address
    {
      await NativeModules.GrinBridge.relayAddressQuery(JSON.stringify(walletState), '5rq8yz')
          .then( relayAddress => {
              console.debug('relay address query ok. full address=' + relayAddress)
          })
          .catch(error => {
              console.debug('relayAddressQueryt fail: ' + error)
          });
    }

    console.debug('--------- -------- demo 1.6 -------- --------')
    //--- Demo 1.6: How to checkPassword
    {
      // correct password
      await NativeModules.GrinBridge.checkPassword(JSON.stringify(walletState), 'your-password')
          .then( () => {
              console.debug('checkPassword ok')
          })
          .catch(error => {
              console.debug('checkPassword fail: ' + error)
          })

      // wrong password
      await NativeModules.GrinBridge.checkPassword(JSON.stringify(walletState), '12345678')
          .then( () => {
              console.debug('checkPassword ok')
          })
          .catch(error => {
              console.debug('checkPassword fail: ' + error)
          })
    }

    //--- Demo 1.7: How to create a new wallet with 12-words mnemonic phrases
    console.debug('--------- -------- demo 1.7 -------- --------')
    walletState.data_dir = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_4';
    await NativeModules.GrinBridge.walletInit(JSON.stringify(walletState), walletState.password, true);
    console.debug( 'wallet_4 data directory: ' + walletState.data_dir );

    const wallet4Mnemonic = await NativeModules.GrinBridge.walletPhrase(JSON.stringify(walletState));
    console.debug( 'wallet_4 mnemonic phrases: ' + wallet4Mnemonic );

      console.debug('--------- -------- demo 2 -------- --------')
      //--- Demo 2: How to recover a wallet from the backup mnemonic phrases
      {
          walletState.data_dir = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_2'
          console.debug('wallet_2 data directory: ' + walletState.data_dir)

          const mnemonic = 'survey write again earth song palace wreck adjust genre upper arctic episode wonder resource actress eye aspect few element fiscal announce note sword early'

          await NativeModules.GrinBridge.walletRecovery(JSON.stringify(walletState), mnemonic)
          const wallet2Mnemonic = await NativeModules.GrinBridge.walletPhrase(JSON.stringify(walletState))

          console.debug('wallet_2 mnemonic phrases: ' + wallet2Mnemonic)
      }

      console.debug('--------- -------- demo 3 -------- --------')
      //--- Demo 3: How to restore the wallet outputs for a fresh recovered wallet
      {
          let startIndex = 1
          let batchSize = 1000
          let lastIndex = 0
          let highest = 1
          while (lastIndex < highest) {
              await NativeModules.GrinBridge.walletRestore(JSON.stringify(walletState), startIndex, batchSize)
                  .then(JSON.parse)
                  .then(({lastRetrievedIndex, highestIndex, numberOfFound}) => {
                      console.debug('walletRestore progress: ' + lastRetrievedIndex + '/' + highestIndex + ' outputs found: ' + numberOfFound)
                      lastIndex = lastRetrievedIndex
                      highest = highestIndex

                      startIndex = lastRetrievedIndex + 1
                  })
                  .catch(error => {
                      console.debug('walletRestore fail: ' + error)
                      //break
                  })
          }

          console.debug('--------- -------- demo 3.1 -------- --------')
          //--- Demo 3.1: How to get the wallet balance
          {
              await NativeModules.GrinBridge.balance(JSON.stringify(walletState))
                  .then(JSON.parse)
                  .then( (data: RustBalance) => {
                      let balance = mapRustBalance(data)
                      console.debug('wallet get balance ok' + JSON.stringify(balance))
                  })
                  .catch(error => {
                      console.debug('wallet get balance fail: ' + error)
                  })
          }

          console.debug('--------- -------- demo 3.2 -------- --------')
          //--- Demo 3.2: How to create a transaction (by file)
          let slateId = ''
          {
              const slate = await NativeModules.GrinBridge.txCreate(JSON.stringify(walletState), 10000000, 'smallest', 'a user message', -1)
                  .then(JSON.parse)
                  .then((slate: Slate) => {
                      slateId = slate.id
                      console.debug('wallet tx created: slate=' + JSON.stringify(slate))
                  })
                  .catch(error => {
                      console.debug('wallet tx create fail: ' + error)
                  })
          }

          console.debug('--------- -------- demo 3.3 -------- --------')
          //--- Demo 3.3: How to get the wallet transactions
          {
              const data = await NativeModules.GrinBridge.txsGet(JSON.stringify(walletState))
                  .then(JSON.parse)
                  .catch(error => {
                      console.debug('wallet get txs fail: ' + error)
                  })

              console.debug('wallet txs: validated=' + data[0])
              const mappedData = data[1]
                  .filter((tx: RustTx) => tx.tx_type.indexOf('Cancelled') === -1)
                  .map((tx: RustTx) => {
                      console.debug('wallet txs: ' + JSON.stringify(tx))
                  })
          }

          console.debug('--------- -------- demo 3.4 -------- --------')
          //--- Demo 3.4: How to get one wallet transaction with slate_id
          let txId = -1
          {
              const data = await NativeModules.GrinBridge.txGet(JSON.stringify(walletState), slateId)
                  .then(JSON.parse)
                  .catch(error => {
                      console.debug('wallet get tx fail: ' + error)
                  })

              console.debug('wallet tx: validated=' + data[0])
              const mappedData = data[1]
                  .map((tx: RustTx) => {
                      console.debug('wallet tx: ' + JSON.stringify(tx))
                      txId = tx.id
                  })
          }

          console.debug('--------- -------- demo 3.5 -------- --------')
          //--- Demo 3.5: How to query one output/s by slate id
          //--- Removed. Use txGet instead.

          console.debug('--------- -------- demo 3.6 -------- --------')
          //--- Demo 3.6: How to cancel a transaction
          if (txId >= 0) {
              await NativeModules.GrinBridge.txCancel(JSON.stringify(walletState), slateId)
                  .then( () => {
                      console.debug('tx cancel ok. slateId=' + slateId)
                  })
                  .catch(error => {
                      console.debug('tx cancel fail: ' + error)
                  })
          }

          console.debug('--------- -------- demo 3.7 -------- --------')
          //--- Demo 3.7: How to query the outputs
          {
              const data = await NativeModules.GrinBridge.outputsGet(JSON.stringify(walletState))
                  .then(JSON.parse)
                  .catch(error => {
                      console.debug('wallet get outputs fail: ' + error)
                  })

              console.debug('wallet outputs: validated=' + data[0])
              const mappedData = data[1]
                  .map((output: RustOutput) => {
                      console.debug('wallet outputs: ' + JSON.stringify(output))
                  })
          }

          console.debug('--------- -------- demo 3.8 -------- --------')
          //--- Demo 3.8: How to send a transaction by http/s, or send to a Grin Relay address
          {
              let isCreated = false
              const slate = await NativeModules.GrinBridge.txSend(JSON.stringify(walletState),
                    10000000, 'smallest', 'a user message', -1, 'http://sga.grin.icu:13415')
                  .then(JSON.parse)
                  .then((slate: Slate) => {
                      slateId = slate.id
                      isCreated = true
                      console.debug('wallet http/s tx sent ok: slate=' + JSON.stringify(slate))
                  })
                  .catch(error => {
                      console.debug('wallet http/s tx send fail: ' + error)
                  })

              // No need anymore! the new 'txSend' will call 'txPost' automatically!
              /*
              if (isCreated) {
                  await NativeModules.GrinBridge.txPost(JSON.stringify(walletState), slateId)
                      .then( () => {
                          console.debug('Tx post ok. slateId=' + slateId)
                      })
                      .catch(error => {
                          console.debug('Tx post fail: ' + error)
                      })
              }*/

              console.debug('--------- -------- demo relay send -------- --------')

              const slate2 = await NativeModules.GrinBridge.txSend(JSON.stringify(walletState),
                  10000000, 'smallest', 'a user message', -1, 'tn1-q00k34d9-n2s6zy2snu24rrj-xdcram4dhp02kgm-5zrye7c9yxfxq2u-5rq8yz')
                  .then(JSON.parse)
                  .then((slate: Slate) => {
                      slateId = slate.id
                      isCreated = true
                      console.debug('wallet tx sent to relay ok: slate=' + JSON.stringify(slate))
                  })
                  .catch(error => {
                      console.debug('wallet tx send to relay fail: ' + error)
                  })
          }

          console.debug('--------- -------- demo 3.9 -------- --------')
          //--- Demo 3.9: How to make a transaction by file exchange
          {
              let isCreated = true

              // Step1 - Create Slate On Wallet_2
              await NativeModules.GrinBridge.txCreate(JSON.stringify(walletState), 10000000, 'smallest', 'a user message', -1)
                  .then(JSON.parse)
                  .then((slate: Slate) => {
                      slateId = slate.id
                      console.debug('wallet2 tx created: slateId=' + slateId)
                      let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_2/' + slateId + '.init'
                      RNFetchBlob.fs.writeFile(fileName, JSON.stringify(slate), 'utf8')
                          .then(()=>{ console.debug('wallet2 slate saved: slateId=' + slateId) })
                          .catch(error => {
                              isCreated = false
                              console.debug('wallet2 slate saving file ' + fileName + ' failed: ' + error)
                          })
                  })
                  .catch(error => {
                      isCreated = false
                      console.debug('wallet2 tx create failed: ' + error)
                  })

              // Create Wallet_3
              let wallet3State = walletState
              wallet3State.data_dir = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_3'

              if (isCreated) {
                  await NativeModules.GrinBridge.walletInit(JSON.stringify(wallet3State), wallet3State.password, false)
                      .then(() => {
                          console.debug('wallet 3 created ok: ' + wallet3State.data_dir)
                      })
                      .catch(error => {
                          isCreated = false
                          console.debug('wallet 3 created fail: ' + error)
                      })
              }

              // Step 2 - On Wallet_3 Receive above Slate (file)
              if (isCreated) {
                  let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_2/' + slateId + '.init'
                  await NativeModules.GrinBridge.txReceive(JSON.stringify(wallet3State), fileName, 'a receive message')
                      .then(JSON.parse)
                      .then((slate: Slate) => {
                          console.debug('wallet3 tx received: slateId=' + slate.id)
                          let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_3/' + slateId + '.rx'
                          RNFetchBlob.fs.writeFile(fileName, JSON.stringify(slate), 'utf8')
                              .then(() => {
                                  console.debug('wallet3 slate saved: slateId=' + slate.id)
                              })
                              .catch(error => {
                                  console.debug('wallet3 slate saving file ' + fileName + ' failed: ' + error)
                              })
                      })
                      .catch(error => {
                          isCreated = false
                          console.debug('wallet3 tx receive fail: ' + error)
                      })
              }

              // Step 3 - On Wallet_2 Finalize above Slate (file)
              if (isCreated) {
                  let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_3/' + slateId + '.rx';
                  await NativeModules.GrinBridge.txFinalize(JSON.stringify(walletState), fileName)
                      .then(JSON.parse)
                      .then((slate: Slate) => {
                          console.debug('wallet2 tx finalized: slateId=' + slate.id);
                          let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/wallet_2/' + slateId + '.finalized';
                          RNFetchBlob.fs.writeFile(fileName, JSON.stringify(slate), 'utf8')
                              .then(() => {
                                  console.debug('wallet2 slate saved: slateId=' + slate.id)
                              })
                              .catch(error => {
                                  console.debug('wallet2 slate saving file ' + fileName + ' failed: ' + error)
                              })
                      })
                      .catch(error => {
                          isCreated = false
                          console.debug('wallet2 tx finalized fail: ' + error)
                      })
              }

              if (isCreated) {
                  await NativeModules.GrinBridge.txPost(JSON.stringify(walletState), slateId)
                      .then( () => {
                          console.debug('wallet2 post ok. slateId=' + slateId)
                      })
                      .catch(error => {
                          console.debug('wallet2 post fail: ' + error)
                      })
              }
          }
      }


    //--- Demo 4: How to repair the wallet outputs for an existing wallet
    //   {
    //       let startIndex = 1
    //       let batchSize = 1000
    //       let lastIndex = 0
    //       let highest = 1
    //       let updateOutputs = true
    //       while (lastIndex < highest) {
    //           await NativeModules.GrinBridge.walletRepair(JSON.stringify(result), startIndex, batchSize, updateOutputs)
    //               .then(JSON.parse)
    //               .then(({lastRetrievedIndex, highestIndex}) => {
    //                   console.debug('walletRepair progress: ' + lastRetrievedIndex + '/' + highestIndex)
    //                   lastIndex = lastRetrievedIndex
    //                   highest = highestIndex
    //
    //                   startIndex = lastRetrievedIndex + 1
    //                   updateOutputs = false
    //               })
    //               .catch(error => {
    //                   console.debug('walletRepair fail: ' + error)
    //                   //break
    //               })
    //       }
    //   }
  }
  // Gary-

  render() {
    return (
      <Provider store={this.configureStore.store}>
        <PersistGate loading={null} persistor={this.configureStore.persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
