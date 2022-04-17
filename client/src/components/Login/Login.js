import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Control, Errors, Form, LocalForm } from 'react-redux-form'
//import { Control, Errors, actions, Form } from 'react-redux-form'
import { Button, FormGroup } from 'reactstrap';
import { required, maxLength, minLength, validUsername } from '../validation-form'
import './index.css';
import axios from 'axios';
import { baseURL } from '../../shared/baseURL';


const Login = (props) => {

    const [userLogin, setUserLogin] = useState();
    const [adminLogin, setAdminLogin] = useState();


    function handleSubmit(values) {
        if (props.isAdmin) {
            setAdminLogin(values);
        } else {
            setUserLogin(values)
        }
    }

    useEffect(() => {
        if (userLogin || adminLogin) {
            //console.log(userLogin, adminLogin);
            async function loginFunc() {
                try {
                    //Check user or admin login => adsign proper data to dataLogin
                    let dataLogin = props.isAdmin ? adminLogin : userLogin;
                    dataLogin = { ...dataLogin, isAdmin: props.isAdmin }
                    //Send request to server
                    await axios.post(baseURL + 'login', dataLogin, { withCredentials: true })
                        .then(response => response.data)
                        .then(data => {

                            console.log(data.message);
                        })
                } catch (error) {
                    console.log(error.response.data.message);
                }
            }
            loginFunc();

            // Reset state
            setUserLogin();
            setAdminLogin();
        }


    }, [userLogin, adminLogin])



    return (
        <div className='mt-5 container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6 '>

                    <h2 className='text-center'>ĐĂNG NHẬP</h2>

                    <LocalForm model='loginForm' onSubmit={(values) => handleSubmit(values)}>
                        <FormGroup row>
                            <Control.text
                                model={'.username'}
                                id='username'
                                className='form-control'
                                name='username'
                                type='text'
                                maxLength={15}
                                placeholder='Username'
                                validators={{
                                    required,
                                    minLength: minLength(5),
                                    validUsername
                                }}
                            />
                            <Errors
                                model={'.username'}
                                show='touched'
                                className='errors'
                                messages={{
                                    required: 'Không được để trống!',
                                    minLength: 'Tối thiểu 5 ký tự!',
                                    validUsername: 'Username không hợp lệ!'
                                }}
                            />
                        </FormGroup>
                        <FormGroup row>
                            <Control.text
                                model='.password'
                                id='password'
                                className='form-control'
                                name='password'
                                type='password'
                                placeholder='Password'
                                maxLength={15}
                                validators={{
                                    required
                                }}
                            />
                            <Errors
                                model={'.username'}
                                show='touched'
                                className='errors'
                                messages={{
                                    required: 'Không được để trống!'
                                }}
                            />
                        </FormGroup>

                        <div className='form-action'>
                            <Button color='primary' type='submit'>Đăng Nhập</Button>
                        </div>
                    </LocalForm>

                    <div className='form-action'>
                        <Link to={'/signup'}>Đăng Ký</Link>
                    </div>
                    <div className='form-action'>
                        <Link to={'/forgot-password'}>Quên mật khẩu</Link>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>

        </div>
    )
}

export default Login


