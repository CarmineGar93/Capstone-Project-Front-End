import { RETRIEVE_PLANS, SET_SELECTED, RETRIEVE_ACTIVE_PLAN, REMOVE_ACTIVE_PLAN } from "../actions";
const initialState = {
    myplans: null,
    selected: null,
    active: null,
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
        case RETRIEVE_ACTIVE_PLAN:
            return {
                ...state,
                active: action.payload
            }
        case REMOVE_ACTIVE_PLAN:
            return {
                ...state,
                active: null
            }
        default:
            return state
    }
}

export default plansReducer