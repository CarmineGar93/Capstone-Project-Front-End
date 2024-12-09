import { toast } from "react-toastify"

export const RETRIEVE_USER = 'RETRIEVE_USER'
export const RETRIEVE_PLANS = 'RETRIEVE_PLANS'
export const SET_SELECTED = 'SET_SELECTED'
export const RETRIEVE_ACTIVE_PLAN = 'RETRIEVE_ACTIVE_PLAN'
export const RETRIEVE_FAVOURITES = 'RETRIEVE_FAVOURITES'
export const REMOVE_PLANS = 'REMOVE_PLANS'
export const REMOVE_USER = 'REMOVE_USER'

export const RemovePlansAction = () => {
    return {
        type: REMOVE_PLANS
    }
}

export const RemoveUserAction = () => {
    return {
        type: REMOVE_USER
    }
}


export const SetSelectedPlanAction = (selectedPlan) => {
    return {
        type: SET_SELECTED,
        payload: selectedPlan,
    }
}

export const RetrieveFavouritesAction = (token) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3001/users/me/favourites", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                dispatch({
                    type: RETRIEVE_FAVOURITES,
                    payload: data
                })
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
}



export const RetrieveActivePlan = (token) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3001/plans/myplans/active", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                dispatch({
                    type: RETRIEVE_ACTIVE_PLAN,
                    payload: data
                })
            } else if (response.status === 404) {
                toast.warn("No active plan")
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
}

export const RetrievePlansAction = (token, page) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3001/plans/myplans?page=" + page, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                dispatch({
                    type: RETRIEVE_PLANS,
                    payload: data
                })
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
}

export const RetrieveUserAction = (token, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3001/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                dispatch({
                    type: RETRIEVE_USER,
                    payload: data
                })
            } else if (response.status === 401) {
                localStorage.removeItem("token")
                dispatch(RemoveUserAction())
                dispatch(RemovePlansAction())
                toast.warn("You must re-do login")
                navigate("/explore")
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
}
