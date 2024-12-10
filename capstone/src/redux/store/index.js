import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/users'
import plansReducer from '../reducers/plans'
import loadingReducer from '../reducers/loading'
const mainReducer = combineReducers({
    user: userReducer,
    plans: plansReducer,
    loading: loadingReducer
})

const store = configureStore({
    reducer: mainReducer
})

export default store