import { handleActions } from 'redux-actions'
import { CONTACT_TEST } from '../constants/actionTypes'

const initialState = {
    test: false,
}

const contact = handleActions(
    {
        [CONTACT_TEST]: (state, { payload }) => {
            return { ...state, test: true }
        },
    },
    initialState
)

export default contact