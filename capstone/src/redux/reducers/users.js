import { RETRIEVE_USER, RETRIEVE_FAVOURITES, REMOVE_USER } from "../actions";
const initialState = {
    logged: null,
    favourites: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_USER:
            return {
                ...state,
                logged: action.payload
            }
        case REMOVE_USER:
            return {
                ...initialState
            }
        case RETRIEVE_FAVOURITES:
            return {
                ...state,
                favourites: action.payload
            }
        default:
            return state
    }
}

export default userReducer