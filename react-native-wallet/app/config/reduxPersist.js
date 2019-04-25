import { AsyncStorage } from 'react-native'

const REDUX_PERSIST = {
    storeConfig: {
        key: `root-1.0`,
        storage: AsyncStorage,
        // blacklist: [], //reducer keys that you do NOT want stored to persistence here
        // whitelist: [], //Optionally, just specify the keys you Do want stored to persistence.
        //An empty array means 'don't store any reducers' -> infinitered/ignite#409
    },
    debuggable: true
}

export default REDUX_PERSIST