import React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

function SearchLottery() {
    return (
        <div className='container'>

            <h2 className='text-center my-5'>DÒ VÉ SỐ</h2>

            <Form>
                <FormGroup>
                    <Label for='province'>Tỉnh Thành</Label>
                    <Input id='province' name='province' type='select' >
                        <option>Vũng Tàu</option>
                        <option>An Giang</option>
                        <option>HCM</option>
                        <option>Hà Nội</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for='date'>Ngày Xổ Số</Label>
                    <Input id='date' name='date' type='date' />
                </FormGroup>

                <FormGroup>
                    <Label for='number'>Nhập Số</Label>
                    <Input id='number' name='number' type='number' />
                </FormGroup>

                <div className='form-action'>
                    <Button color='primary' type='submit'>Dò</Button>
                </div>
            </Form>
        </div>
    )
}

export default SearchLottery