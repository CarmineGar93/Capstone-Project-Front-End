import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/users'
const mainReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: mainReducer
})

export default store