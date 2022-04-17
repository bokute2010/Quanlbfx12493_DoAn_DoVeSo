import axios from 'axios';
import { Loading } from '../../components/Loading';
import { baseURL } from '../../shared/baseURL';
import * as ActionTypes from '../ActionTypes';

export const fetchUsers = (query) => async dispatch => {
    return await axios.get(baseURL + `users/?page=${query.page}&${query.paramsString}`, { withCredentials: true })
        .then(response => response.data)
        .then(data => {
            //console.log(data);
            dispatch(getUsers(data))
        })
        .catch(error => {
            dispatch(failedLoadUsers(error))
        })
}

export const getUsers = (users) => ({
    type: ActionTypes.GET_USERS,
    payload: users
})

export const loadingUsers = () => ({
    type: ActionTypes.LOADING_USERS
})

export const failedLoadUsers = (errMess) => ({
    type: ActionTypes.FAILED_LOAD_USERS,
    payload: errMess
})
