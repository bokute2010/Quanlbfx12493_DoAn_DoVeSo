import * as ActionTypes from '../ActionTypes';

export const Province = (state = {
    provinces: {},
    northLotteries: []
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_PROVINCES:
            return { state, provinces: action.payload };
        case ActionTypes.GET_NORTH_LOTTERIES:
            return { state, northLotteries: action.payload };
        default:
            return state;
    }
}