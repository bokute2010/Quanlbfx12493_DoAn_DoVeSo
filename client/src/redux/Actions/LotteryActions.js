import axios from 'axios';
import { baseURL } from '../../shared/baseURL';
import * as ActionTypes from '../ActionTypes';


const messageAlert = (method, message, className, numberDel) => {
    document.getElementById('alert-div').style.display = '';

    document.getElementById('alert-message').innerText = `${method} phần tử ${message}`;

    numberDel ? document.getElementById('alert-message').innerText = `${method} ${numberDel} phần tử ${message}`
        : document.getElementById('alert-message').innerText = `${method} phần tử ${message}`;

    document.getElementById('alert-message').className = className;

    setTimeout(function () {
        document.getElementById('alert-div').style.display = 'none';
    }, 5000)
}

export const deleteMultiLottery = (data) => async dispatch => {

    // Xóa hết các setimeout để tránh bị trùng
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }

    try {
        dispatch(loadingProvinces())

        return await axios.delete(baseURL + 'lottery/multidelete', { data: data })
            .then(response => response.data)
            .then(provinces => {
                dispatch(getProvinces(provinces));

                //Alert khi delete thành công
                messageAlert('Xóa', 'thành công', 'alert alert-success', data.length)
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));
        //Alert khi delete thất bại
        messageAlert('Xóa', 'thất bại', 'alert alert-danger')
    }
}

export const updateLottery = (provinceId, lottery) => async dispatch => {

    // Xóa hết các setimeout để tránh bị trùng
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }

    try {
        dispatch(loadingProvinces())

        await axios.put(`${baseURL}lottery/?provinceId=${provinceId}`, lottery.g1)
            .then(response => response.data)
            .then(provinces => {
                dispatch(getProvinces(provinces));
                //Alert khi update thành công
                messageAlert('Cập nhật', 'thành công', 'alert alert-success')
            })
    } catch (error) {
        console.log('cc')
        dispatch(getProvinces(error.response.data));
        //Alert khi tạo thất bại
        messageAlert('Cập nhật', 'thất bại', 'alert alert-danger')
    }
}

export const deleteLottery = (provinceId, lotteryId) => async dispatch => {

    // Xóa hết các setimeout để tránh bị trùng
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }

    try {
        dispatch(loadingProvinces())

        return await axios.delete(baseURL + 'lottery/?provinceId=' + provinceId + '&lotteryId=' + lotteryId)
            .then(response => response.data)
            .then(provinces => {
                dispatch(getProvinces(provinces));
                //Alert khi delete thành công
                messageAlert('Xóa', 'thành công', 'alert alert-success');
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));

        //Alert khi tạo thất bại
        messageAlert('Xóa', 'thất bại', 'alert alert-danger');
    }
}

export const createLottery = (lottery) => async dispatch => {

    // Xóa hết các setimeout để tránh bị trùng
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }

    try {
        dispatch(loadingProvinces())

        return await axios.post(baseURL + 'lottery', lottery)
            .then(response => response.data)
            .then(provinces => {
                dispatch(getProvinces(provinces));
                //Alert khi tạo thành công
                messageAlert('Tạo', 'thành công', 'alert alert-success');
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));
        //Alert khi tạo thất bại
        messageAlert('Tạo', 'thất bại', 'alert alert-danger');
    }

}

export const fetchProvinces = () => async dispatch => {
    dispatch(loadingProvinces())
    return await axios.get(baseURL + 'provinces')
        .then(response => {
            //console.log(response);
            return response;
        })
        .then(response => response.data)
        .then(provinces => dispatch(getProvinces(provinces)))
        .catch(error => {
            dispatch(failedLoadProvinces(error))
        })
}

export const getProvinces = (provinces) => ({
    type: ActionTypes.GET_PROVINCES,
    payload: provinces
})

export const loadingProvinces = () => ({
    type: ActionTypes.LOADING_PROVINCES
})

export const failedLoadProvinces = (errMess) => ({
    type: ActionTypes.FAILED_LOAD_PROVINCES,
    payload: errMess
})
