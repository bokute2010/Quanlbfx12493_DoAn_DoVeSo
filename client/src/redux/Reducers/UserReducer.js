import * as ActionTypes from '../ActionTypes';

export const User = (state = {
    isLoading: true,
    errMess: null,
    users: []
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            return { state, isLoading: false, errMess: null, users: action.payload };
        case ActionTypes.LOADING_USERS:
            return { state, isLoading: true, errMess: null, users: [] };
        case ActionTypes.FAILED_LOAD_USERS:
            return { state, isLoading: true, errMess: action.payload, users: [] };
        default:
            return state;
    }
}