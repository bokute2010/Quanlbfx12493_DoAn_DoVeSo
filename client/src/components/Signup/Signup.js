import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap'

function Signup() {
    return (
        <div className='mt-5 container'>
            <h2 className='text-center'>ĐĂNG KÝ</h2>
            <Form>
                <FormGroup>
                    <Input id='username' name='username' type='text' placeholder='Username' />
                </FormGroup>
                <FormGroup>
                    <Input id='email' name='email' type='email' placeholder='Email' />
                </FormGroup>
                <FormGroup>
                    <Input id='password' name='password' type='password' placeholder='Password' />
                </FormGroup>
                <FormGroup>
                    <Input id='confirm-password' name='confirm-password' type='confirm-password' placeholder='Confirm Password' />
                </FormGroup>
                <div className='form-action'>
                    <Button color='primary' type='submit'>Đăng Ký</Button>
                </div>
            </Form>
            <div className='row'>
                <div className='col-md-6 form-action'>
                    <Link to={'/signup'}>Đăng Nhập</Link>
                </div>
                <div className='col-md-6 form-action'>
                    <Link to={'/forgot-password'}>Quên mật khẩu</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup