import { CHANGE_LOADING } from "../actions";

const initialState = {
    loading: false
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export default loadingReducer