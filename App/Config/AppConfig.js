// Simple React Native specific changes

import '../I18n/I18n'
import RNFetchBlob from 'rn-fetch-blob'
// console.log('RNFetchBlob', RNFetchBlob)
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  walletState: {
    account: 'default',
    chain_type: 'floonet',
    data_dir: RNFetchBlob.fs.dirs.DocumentDir + '/',
    node_api_addr: 'https://sga.grin.icu:13413',
    password: '123456',
    minimum_confirmations: 10
  },
  grinVersion: -1,
  grinStrategy: 'smallest',
  nodeApiSecret: 'ZbiQCN85Srih3f27PJXH'
}
