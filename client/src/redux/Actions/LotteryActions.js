import axios from 'axios';
import { baseURL } from '../../shared/baseURL';
import * as ActionTypes from '../ActionTypes';


export const createLottery = (lottery) => dispatch => {
    return axios.post(baseURL + 'add-lottery', lottery)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error);
        })
}

// export const fetchNorthLotteries = () => dispatch => {
//     return axios.get(baseURL + 'lotteries/northLotteries')
//         .then(response => {
//             return response.data
//         })
//         .then(northLotteries => dispatch(getNorthLotteries(northLotteries)))
//         .catch(error => {
//             console.log(error)
//         })
// }

// export const getNorthLotteries = (northLotteries) => ({
//     type: ActionTypes.GET_NORTH_LOTTERIES,
//     payload: northLotteries
// })

export const fetchProvinces = () => dispatch => {
    return axios.get(baseURL + 'provinces')
        .then(response => {
            //console.log(response);
            return response;
        })
        .then(response => response.data)
        .then(provinces => dispatch(getProvinces(provinces)))
        .catch(error => {
            console.log(error);
        })
}

export const getProvinces = (provinces) => ({
    type: ActionTypes.GET_PROVINCES,
    payload: provinces
})
