import { RETRIEVE_PLANS, SET_SELECTED } from "../actions";
const initialState = {
    myplans: null,
    selected: null
}

const plansReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_PLANS:
            return {
                ...state,
                myplans: action.payload
            }
        case SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state
    }
}

export default plansReducer