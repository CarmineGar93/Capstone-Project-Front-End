import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/users'
import plansReducer from '../reducers/plans'
const mainReducer = combineReducers({
    user: userReducer,
    plans: plansReducer
})

const store = configureStore({
    reducer: mainReducer
})

export default store