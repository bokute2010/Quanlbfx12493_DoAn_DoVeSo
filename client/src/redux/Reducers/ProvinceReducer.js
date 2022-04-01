import * as ActionTypes from '../ActionTypes';

export const Province = (state = {
    isLoading: true,
    errMess: null,
    provinces: []
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_PROVINCES:
            return { state, isLoading: false, errMess: null, provinces: action.payload };
        case ActionTypes.LOADING_PROVINCES:
            return { state, isLoading: true, errMess: null, provinces: [] };
        case ActionTypes.FAILED_LOAD_PROVINCES:
            return { state, isLoading: true, errMess: action.payload, provinces: [] };
        default:
            return state;
    }
}