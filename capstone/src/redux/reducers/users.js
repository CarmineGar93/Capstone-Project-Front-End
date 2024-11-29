import { RETRIEVE_USER } from "../actions";
const initialState = {
    logged: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_USER:
            return {
                ...state,
                logged: action.payload
            }
        default:
            return state
    }
}

export default userReducer