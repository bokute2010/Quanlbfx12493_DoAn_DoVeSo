import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap'
import './index.css';



const Login = () => {
    return (
        <div className='mt-5 container'>
            <h2 className='text-center'>ĐĂNG NHẬP</h2>
            <Form>
                <FormGroup>
                    <Input id='username' name='username' type='text' placeholder='Username' />
                </FormGroup>
                <FormGroup>
                    <Input id='password' name='password' type='password' placeholder='Password' />
                </FormGroup>
                <div className='form-action'>
                    <Button color='primary' type='submit'>Đăng Nhập</Button>
                </div>
            </Form>
            <div className='row'>
                <div className='col-md-6 form-action'>
                    <Link to={'/signup'}>Đăng Ký</Link>
                </div>
                <div className='col-md-6 form-action'>
                    <Link to={'/forgot-password'}>Quên mật khẩu</Link>
                </div>
            </div>
        </div>
    )
}

export default Login