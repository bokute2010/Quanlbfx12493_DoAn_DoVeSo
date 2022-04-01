import axios from 'axios';
import { baseURL } from '../../shared/baseURL';
import * as ActionTypes from '../ActionTypes';

export const deleteMultiLottery = (data) => async dispatch => {

    // Xóa hết các setimeout để tránh bị trùng
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }

    try {
        //console.log(data)
        dispatch(loadingProvinces())

        return await axios.delete(baseURL + 'lottery/multidelete', { data: data })
            .then(response => response.data)
            .then(provinces => {
                dispatch(getProvinces(provinces));



                //Alert khi delete thành công
                document.getElementById('alert-div').style.display = '';
                document.getElementById('alert-message').innerText = `Xóa ${data.length} phần tử thành công!`
                document.getElementById('alert-message').className = 'alert alert-success'
                setTimeout(function () {
                    document.getElementById('alert-div').style.display = 'none';
                }, 5000)
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));

        //Alert khi tạo thất bại
        document.getElementById('alert-div').style.display = '';
        document.getElementById('alert-message').innerText = 'Xóa thông tin thất bại'
        document.getElementById('alert-message').className = 'alert alert-danger'
        setTimeout(function () {
            document.getElementById('alert-div').style.display = 'none';
        }, 7000)
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

        await axios.put(`${baseURL}lottery/?provinceId=${provinceId}`, lottery)
            .then(response => response.data)
            .then(provinces => {
                dispatch(getProvinces(provinces));
                //Alert khi update thành công
                document.getElementById('alert-div').style.display = '';
                document.getElementById('alert-message').innerText = 'Cập nhật thông tin thành công!'
                document.getElementById('alert-message').className = 'alert alert-success'
                setTimeout(function () {
                    document.getElementById('alert-div').style.display = 'none';
                }, 7000)
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));

        //Alert khi tạo thất bại
        document.getElementById('alert-div').style.display = '';
        document.getElementById('alert-message').innerText = 'Cập nhật thông tin thất bại'
        document.getElementById('alert-message').className = 'alert alert-danger'
        setTimeout(function () {
            document.getElementById('alert-div').style.display = 'none';
        }, 7000)
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
                document.getElementById('alert-div').style.display = '';
                document.getElementById('alert-message').innerText = 'Xóa thông tin thành công!'
                document.getElementById('alert-message').className = 'alert alert-success'
                setTimeout(function () {
                    document.getElementById('alert-div').style.display = 'none';
                }, 5000)
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));

        //Alert khi tạo thất bại
        document.getElementById('alert-div').style.display = '';
        document.getElementById('alert-message').innerText = 'Xóa thông tin thất bại'
        document.getElementById('alert-message').className = 'alert alert-danger'
        setTimeout(function () {
            document.getElementById('alert-div').style.display = 'none';
        }, 7000)
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
                document.getElementById('alert-div').style.display = '';
                document.getElementById('alert-message').innerText = 'Thêm thông tin thành công!'
                document.getElementById('alert-message').className = 'alert alert-success'
                setTimeout(function () {
                    document.getElementById('alert-div').style.display = 'none';
                }, 7000)
            })
    } catch (error) {
        dispatch(getProvinces(error.response.data));

        //Alert khi tạo thất bại
        document.getElementById('alert-div').style.display = '';
        document.getElementById('alert-message').innerText = 'Thêm thông tin thất bại'
        document.getElementById('alert-message').className = 'alert alert-danger'
        setTimeout(function () {
            document.getElementById('alert-div').style.display = 'none';
        }, 7000)
    }

    // .then(response => {
    //     console.log(response.data.message)
    //     //dispatch(getProvinces(response.data));
    //     //return response

    // })
    // .then(response => {
    //     if (response.status === 200) {
    //         //Alert khi tạo thành công
    //         document.getElementById('alert-div').style.display = '';
    //         document.getElementById('alert-message').innerText = 'Thêm thông tin thành công!'
    //         document.getElementById('alert-message').className = 'alert alert-success'

    //         setTimeout(function () {
    //             document.getElementById('alert-div').style.display = 'none';
    //         }, 7000)


    //     }

    //     if (response.status === 201) {
    //         console.log(response.data)
    //         //Alert khi tạo thất bại
    //         document.getElementById('alert-div').style.display = '';
    //         document.getElementById('alert-message').innerText = 'Thêm thông tin thất bại'
    //         document.getElementById('alert-message').className = 'alert alert-danger'
    //         setTimeout(function () {
    //             document.getElementById('alert-div').style.display = 'none';
    //         }, 7000)
    //     }

    // })
    // } catch (error) {
    //     console.log(error)
    // }


    // return axios.post(baseURL + 'lottery', lottery)
    //     .then(response => {
    //         console.log(response);
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         if (response.status === 201) {
    //             return response.data;
    //         }
    //     })
    //     .then(provinces => dispatch(getProvinces(provinces)))
    //     .then(() => {
    //         //Alert khi tạo thành công
    //         document.getElementById('alert-div').style.display = '';
    //         document.getElementById('alert-message').innerText = 'Thêm thông tin thành công!'
    //         document.getElementById('alert-message').setAttribute('color', 'success')
    //         setTimeout(function () {
    //             document.getElementById('alert-div').style.display = 'none';
    //         }, 7000)
    //     })



}


export const fetchProvinces = () => dispatch => {
    dispatch(loadingProvinces())
    return axios.get(baseURL + 'provinces')
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
