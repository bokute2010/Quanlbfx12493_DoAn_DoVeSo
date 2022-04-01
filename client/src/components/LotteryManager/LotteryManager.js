import React, { useState } from 'react'
import { Alert, Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Control, Errors, LocalForm } from 'react-redux-form'
import RenderNorthLottery from './RenderNorthLottery'
import { Loading } from '../Loading'
import moment from 'moment'

import { required, validNumber } from './validation-form'

function region() {
    const region = document.getElementById('region').value;
    if (region === 'north') {
        document.getElementById('northForm').style.display = '';
        document.getElementById('southForm').style.display = 'none';
        document.getElementById('centralForm').style.display = 'none';
    } else if (region === 'south') {
        document.getElementById('southForm').style.display = '';
        document.getElementById('northForm').style.display = 'none';
        document.getElementById('centralForm').style.display = 'none';
    } else {
        document.getElementById('southForm').style.display = 'none';
        document.getElementById('northForm').style.display = 'none';
        document.getElementById('centralForm').style.display = '';
    }
}

function SelectProvinces({ provinces }) {
    const _provinces = provinces.map(province => {
        return (
            <option value={province._id}>{province.province}</option>
        )
    })
    return (
        _provinces
    )
}

function RenderCentralLottery() {
    return (
        <div>
            <h1>Central Lottery</h1>
        </div>
    )
}

function RenderSouthLottery() {
    return (
        <div>
            <h1>South Lottery</h1>
        </div>
    )
}

function TabRenderLottery({ northProvinces, centralProvinces, southProvinces, deleteLottery, updateLottery, deleteMultiLottery }) {
    const [isNorthLotteryShow, setIsNorthLotteryShow] = useState(true);
    //const funcNorthLotteryShow = () => setIsNorthLotteryShow(!isNorthLotteryShow);

    const [isCentralLotteryShow, setIsCentralLotteryShow] = useState(false);
    //const funcCentralLotteryShow = () => setIsCentralLotteryShow(!isCentralLotteryShow);

    const [isSouthLotteryShow, setIsSouthLotteryShow] = useState(false);
    //const funcSouthLotteryShow = () => setIsSouthLotteryShow(!isSouthLotteryShow);

    return (
        <div className='container mt-5'>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a onClick={() => {
                        setIsNorthLotteryShow(true);
                        setIsCentralLotteryShow(false);
                        setIsSouthLotteryShow(false)
                    }}
                        className={isNorthLotteryShow ? 'nav-link btn active' : 'nav-link btn'}
                        aria-current="page">
                        Miền Bắc
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={() => {
                        setIsCentralLotteryShow(true);
                        setIsNorthLotteryShow(false);
                        setIsSouthLotteryShow(false)
                    }}
                        className={isCentralLotteryShow ? 'nav-link btn active' : 'nav-link btn'}>
                        Miền Trung
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={() => {
                        setIsSouthLotteryShow(true);
                        setIsNorthLotteryShow(false);
                        setIsCentralLotteryShow(false)
                    }}
                        className={isSouthLotteryShow ? 'nav-link btn active' : 'nav-link btn'}>
                        Miền Nam
                    </a>
                </li>

            </ul>

            {isNorthLotteryShow ? <RenderNorthLottery deleteMultiLottery={deleteMultiLottery} deleteLottery={deleteLottery} northProvinces={northProvinces} updateLottery={updateLottery} /> : null}
            {isCentralLotteryShow ? <RenderCentralLottery centralProvinces={centralProvinces} /> : null}
            {isSouthLotteryShow ? <RenderSouthLottery southProvinces={southProvinces} /> : null}
        </div>

    )
}

function LotteryManager(props) {
    //Tạo array chứa các tỉnh miền Bắc
    const northProvinces = props.provinces.filter(province => province.region === 'north');

    //Tạo array chứa các tỉnh miền Trung
    const centralProvinces = props.provinces.filter(province => province.region === 'central');

    //Tạo array chứa các tỉnh miền Nam
    const southProvinces = props.provinces.filter(province => province.region === 'south');

    //useState cho modal tạo Lottery
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    //Hàm xử lý giá trị của LocalForm trả về
    const handleSubmit = (values) => {
        toggle();
        props.createLottery(values)
    }

    //Xử lý nếu dữ liệu đã tải xuống hết và ko lỗi mới cho render
    if (props.isLoading) {
        return (
            <Loading />
        )
    } else if (props.errMess) {
        return (
            <div>
                {props.errMess}
            </div>
        )
    } else {

        return (
            <>
                <div className='container'>

                    {/* Alert xóa lottery thành công. */}
                    <div id='alert-div' style={{ display: 'none' }} className='row pt-3'>
                        <div id='alert-message' role="alert">
                            This is a success alert—check it out!
                        </div>
                    </div>


                    {/* Button và modal thêm vé dò */}
                    <Button onClick={toggle}>Add lottery</Button>
                    <Modal size='lg' isOpen={isOpen}>
                        <ModalHeader toggle={toggle}>
                            Thêm Vé Dò
                        </ModalHeader>
                        <ModalBody>
                            {/*Select Vùng Miền*/}
                            <Form>
                                <FormGroup row>
                                    <Label md={3} for='region'>Chọn Miền</Label>
                                    <Col md={9}>
                                        <Input onChange={region} id='region' name='region' type='select'>
                                            <option selected >
                                                ---Chọn Miền
                                            </option>
                                            <option value='north'>
                                                Miền Bắc
                                            </option>
                                            <option value='central'>
                                                Miền Trung
                                            </option>
                                            <option value='south'>
                                                Miền Nam
                                            </option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>

                            {/*Form Miền Bắc */}

                            <LocalForm onSubmit={(values) => handleSubmit(values)} id='northForm' style={{ 'display': 'none' }}>
                                <Control.text model='.region' type='hidden' defaultValue={'north'} className='form-control' />

                                {/* Tỉnh thành */}
                                <FormGroup row>
                                    <Label md={3} htmlFor='province'>Tỉnh Thành</Label>
                                    <Col sm={9}>
                                        <Control.select model='.province' defaultValue={northProvinces[0]._id} className='form-control'>
                                            <SelectProvinces provinces={northProvinces} />
                                        </Control.select>
                                    </Col>
                                </FormGroup>

                                {/* Nhập Ngày */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.date'>Ngày</Label>
                                    <Col sm={9}>
                                        <Control.text
                                            id='.date'
                                            className='form-control'
                                            type='date'
                                            model='.date'
                                            max={moment(new Date()).format('YYYY-MM-DD')}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".date"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!'
                                            }}
                                        >

                                        </Errors>
                                    </Col>
                                </FormGroup>

                                {/* Giải Đặc Biệt */}
                                <FormGroup row>
                                    <Label sm={3} for='special_prize'>Giải Đặc Biệt</Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.special_prize'
                                            id='special_prize'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".special_prize"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Giải 1 */}
                                <FormGroup row>
                                    <Label sm={3} for='g1'>Giải 1</Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.g1'
                                            id='g1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>


                                {/* Giải 2 */}
                                <FormGroup row>
                                    <Label sm={3} for='g2_1'>Giải 2</Label>
                                    <Col sm={4}>
                                        <Control.text
                                            model='.g2_1'
                                            id='g2_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g2_1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>

                                    <Col sm={5}>
                                        <Control.text
                                            model='.g2_2'
                                            id='g2_2'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 2'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g2_2"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>


                                {/* Giải 3 */}
                                <FormGroup row>
                                    <Label sm={3} for='g3_1'>Giải 3</Label>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g3_1'
                                            id='g3_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g3_1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>

                                    <Col sm={3}>
                                        <Control.text
                                            model='.g3_2'
                                            id='g3_2'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 2'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g3_2"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>

                                    <Col sm={3}>
                                        <Control.text
                                            model='.g3_3'
                                            id='g3_3'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 3'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g3_3"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3}></Label>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g3_4'
                                            id='g3_4'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 4'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g3_4"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>

                                    <Col sm={3}>
                                        <Control.text
                                            model='.g3_5'
                                            id='g3_5'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 5'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g3_5"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>

                                    <Col sm={3}>
                                        <Control.text
                                            model='.g3_6'
                                            id='g3_6'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 6'
                                            maxLength='5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(5)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g3_6"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 5 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>




                                {/* Giải 4 */}
                                <FormGroup row>
                                    <Label sm={3} for='g4_1'>Giải 4</Label>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g4_1'
                                            id='g4_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g4_1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g4_2'
                                            id='g4_2'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 2'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g4_2"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g4_3'
                                            id='g4_3'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 3'

                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g4_3"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g4_4'
                                            id='g4_4'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 4'

                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g4_4"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Giải 5 */}
                                <FormGroup row>
                                    <Label sm={3} for='g5_1'>Giải 5</Label>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g5_1'
                                            id='g5_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g5_1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g5_2'
                                            id='g5_2'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 2'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g5_2"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g5_3'
                                            id='g5_3'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 3'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g5_3"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3} />
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g5_4'
                                            id='g5_4'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 4'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g5_4"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g5_5'
                                            id='g5_5'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 5'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g5_5"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g5_6'
                                            id='g5_6'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 6'
                                            validators={{
                                                required,
                                                validNumber: validNumber(4)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g5_6"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 4 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Giải 6 */}
                                <FormGroup row>
                                    <Label sm={3} for='g6_1'>Giải 6</Label>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g6_1'
                                            id='g6_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            validators={{
                                                required,
                                                validNumber: validNumber(3)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g6_1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 3 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g6_2'
                                            id='g6_2'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 2'
                                            validators={{
                                                required,
                                                validNumber: validNumber(3)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g6_2"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 3 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Control.text
                                            model='.g6_3'
                                            id='g6_3'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 3'
                                            validators={{
                                                required,
                                                validNumber: validNumber(3)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g6_3"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 3 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Giải 7 */}
                                <FormGroup row>
                                    <Label sm={3} for='g7_1'>Giải 7</Label>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g7_1'
                                            id='g7_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 1'
                                            validators={{
                                                required,
                                                validNumber: validNumber(2)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g7_1"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 2 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g7_2'
                                            id='g7_1'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 2'
                                            validators={{
                                                required,
                                                validNumber: validNumber(2)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g7_2"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 2 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g7_3'
                                            id='g7_3'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 3'
                                            validators={{
                                                required,
                                                validNumber: validNumber(2)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g7_3"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 2 số!'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Control.text
                                            model='.g7_4'
                                            id='g7_4'
                                            type='number'
                                            className='form-control'
                                            placeholder='number 4'
                                            validators={{
                                                required,
                                                validNumber: validNumber(2)
                                            }}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".g7_4"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validNumber: 'Yêu cầu đủ 2 số!'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <Button color='primary' type='submit'>
                                    Tạo mới
                                </Button>
                            </LocalForm>

                            {/* Form Miền Trung*/}
                            <LocalForm onSubmit={(values) => handleSubmit(values)} id='centralForm' style={{ 'display': 'none' }}>
                                {/* Hidden value */}
                                <Control.text model='.region' defaultValue={'central'} type='hidden' />

                                {/* Tỉnh thành */}
                                <FormGroup row>
                                    <Label sm={3} for='province'>Tỉnh Thành</Label>
                                    <Col sm={9}>
                                        <Control.select model='.province' defaultValue={centralProvinces[0]._id} className='form-control'>
                                            <SelectProvinces provinces={centralProvinces} />
                                        </Control.select>
                                    </Col>
                                </FormGroup>

                                {/* Ngày */}
                                <FormGroup row>
                                    <Label sm={3} for='date'>Ngày</Label>
                                    <Col sm={9}>
                                        <Control.text className='form-control' type='date' model='.date' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 8 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g8'>Giải 8</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g8' id='.g8' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 7 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g7'>Giải 7</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g7' id='.g7' placeholder='number 1' className='form-control' />
                                    </Col>

                                </FormGroup>

                                {/* Giải 6 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g6_1'>Giải 6</Label>
                                    <Col sm={3}>
                                        <Control.text type='number' model='.g6_1' id='.g6_1' placeholder='number 1' className='form-control' />

                                    </Col>
                                    <Col sm={3}>
                                        <Control.text type='number' model='.g6_2' id='.g6_2' placeholder='number 2' className='form-control' />

                                    </Col>
                                    <Col sm={3}>
                                        <Control.text type='number' model='.g6_3' id='.g6_3' placeholder='number 3' className='form-control' />

                                    </Col>
                                </FormGroup>

                                {/* Giải 5 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g5'>Giải 5</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g5' id='.g5' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 4 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g4_1'>Giải 4</Label>
                                    <Col sm={3} >

                                        <Control.text type='number' model='.g4_1' id='.g4_1' placeholder='number 1' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_2' id='.g4_2' placeholder='number 2' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_3' id='.g4_3' placeholder='number 3' className='form-control' />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}></Label>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_4' id='.g4_4' placeholder='number 4' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_5' id='.g4_5' placeholder='number 5' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_6' id='.g4_6' placeholder='number 6' className='form-control' />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}></Label>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_7' id='.g4_7' placeholder='number 7' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 3 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g3_1'>Giải 3</Label>
                                    <Col sm={4} >
                                        <Control.text type='number' model='.g3_1' id='.g3_1' placeholder='number 1' className='form-control' />
                                    </Col>
                                    <Col sm={5} >
                                        <Control.text type='number' model='.g3_2' id='.g3_2' placeholder='number 2' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 2 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g2'>Giải 2</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g2' id='.g2' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 1 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g1'>Giải 1</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g1' id='.g1' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải Đặc Biệt */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.special_prize'>Giải Đặc Biệt</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.special_prize' id='.special_prize' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                <Button color='primary' type='submit'>
                                    Tạo mới
                                </Button>
                            </LocalForm>

                            {/* Form Miền Nam*/}
                            <LocalForm onSubmit={(values) => handleSubmit(values)} id='southForm' style={{ 'display': 'none' }}>
                                {/* Hidden value */}
                                <Control.text model='.region' defaultValue={'south'} type='hidden' />

                                {/* Tỉnh thành */}
                                <FormGroup row>
                                    <Label sm={3} for='province'>Tỉnh Thành</Label>
                                    <Col sm={9}>
                                        <Control.select model='.province' defaultValue={southProvinces[0]._id} className='form-control'>
                                            <SelectProvinces provinces={southProvinces} />
                                        </Control.select>
                                    </Col>
                                </FormGroup>

                                {/* Ngày */}
                                <FormGroup row>
                                    <Label sm={3} for='date'>Ngày</Label>
                                    <Col sm={9}>
                                        <Control.text className='form-control' type='date' model='.date' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 8 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g8'>Giải 8</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g8' id='.g8' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 7 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g7'>Giải 7</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g7' id='.g7' placeholder='number 1' className='form-control' />
                                    </Col>

                                </FormGroup>

                                {/* Giải 6 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g6_1'>Giải 6</Label>
                                    <Col sm={3}>
                                        <Control.text type='number' model='.g6_1' id='.g6_1' placeholder='number 1' className='form-control' />

                                    </Col>
                                    <Col sm={3}>
                                        <Control.text type='number' model='.g6_2' id='.g6_2' placeholder='number 2' className='form-control' />

                                    </Col>
                                    <Col sm={3}>
                                        <Control.text type='number' model='.g6_3' id='.g6_3' placeholder='number 3' className='form-control' />

                                    </Col>
                                </FormGroup>

                                {/* Giải 5 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g5'>Giải 5</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g5' id='.g5' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 4 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g4_1'>Giải 4</Label>
                                    <Col sm={3} >

                                        <Control.text type='number' model='.g4_1' id='.g4_1' placeholder='number 1' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_2' id='.g4_2' placeholder='number 2' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_3' id='.g4_3' placeholder='number 3' className='form-control' />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}></Label>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_4' id='.g4_4' placeholder='number 4' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_5' id='.g4_5' placeholder='number 5' className='form-control' />
                                    </Col>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_6' id='.g4_6' placeholder='number 6' className='form-control' />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}></Label>
                                    <Col sm={3} >
                                        <Control.text type='number' model='.g4_7' id='.g4_7' placeholder='number 7' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 3 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g3_1'>Giải 3</Label>
                                    <Col sm={4} >
                                        <Control.text type='number' model='.g3_1' id='.g3_1' placeholder='number 1' className='form-control' />
                                    </Col>
                                    <Col sm={5} >
                                        <Control.text type='number' model='.g3_2' id='.g3_2' placeholder='number 2' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 2 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g2'>Giải 2</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g2' id='.g2' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải 1 */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.g1'>Giải 1</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.g1' id='.g1' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                {/* Giải Đặc Biệt */}
                                <FormGroup row>
                                    <Label sm={3} htmlFor='.special_prize'>Giải Đặc Biệt</Label>
                                    <Col sm={9}>
                                        <Control.text type='number' model='.special_prize' id='.special_prize' placeholder='number 1' className='form-control' />
                                    </Col>
                                </FormGroup>

                                <Button color='primary' type='submit'>
                                    Tạo mới
                                </Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>


                </div>



                <div className='container mt-5'>

                    <TabRenderLottery
                        northProvinces={northProvinces}
                        centralProvinces={centralProvinces}
                        southProvinces={southProvinces}
                        deleteLottery={props.deleteLottery}
                        deleteMultiLottery={props.deleteMultiLottery}
                        updateLottery={props.updateLottery}
                    />

                </div>
            </>
        )
    }



}

export default LotteryManager