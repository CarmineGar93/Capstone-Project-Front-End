export const RETRIEVE_USER = 'RETRIEVE_USER'
export const RETRIEVE_PLANS = 'RETRIEVE_PLANS'
export const SET_SELECTED = 'SET_SELECTED'
export const SetSelectedPlanAction = (selectedPlan) => {
    return {
        type: SET_SELECTED,
        payload: selectedPlan,
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
            alert(err)
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
                navigate("/explore")

            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            alert(err)
        }
    }
}
