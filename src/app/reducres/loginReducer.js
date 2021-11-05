import { LOGIN_ACTION } from "../action/types";

const initialState = {
    isAuthenticated: false,
    currentUser: ""
}

const loginReducer = (state = initialState, action) => {
    
    switch (action.type){
        case 'LOGIN_ACTION':
            return {
                isAuthenticated: action.payload.isAuthenticated,
                currentUser: action.payload.username
            }
        case 'LOGOUT_ACTION':
            return {...state, isAuthenticated: false}
        default:
            return state
    }
}


export default loginReducer