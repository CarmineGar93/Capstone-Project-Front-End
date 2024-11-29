export const RETRIEVE_USER = 'RETRIEVE_USER'
export const RetrieveUserAction = (token) => {
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
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            alert(err)
        }
    }
}
