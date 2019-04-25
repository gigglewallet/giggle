import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import ReduxPersist from './reduxPersist'

const persistConfig = { ...ReduxPersist.storeConfig }

export default rootReducer => {
    /* ---------- Redux Configuration ---------- */
    const middleware = []
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    /* ---------- Middleware ---------- */
    middleware.push(thunk)
    if (ReduxPersist.debuggable) middleware.push(createLogger())

    let store = createStore(
        persistedReducer, {}, applyMiddleware(...middleware)
    )

    let persistor = persistStore(store)

    return {
        store,
        persistor,
    }
}