import React from 'react'
import { combineReducers } from 'redux'
import configureStore from '../config/createStore'
import contact from './contact'

const reducers = combineReducers({
    contact,
})

export default () => {
    let { store, persistor } = configureStore(reducers)
    return { store, persistor }
}