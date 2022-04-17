import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Control, Errors, Form } from 'react-redux-form';
import { Loading } from '../Loading'
import moment from 'moment';

import { isPositive, required, validNumber } from '../validation-form'
import RenderLottery from './RenderLottery';


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

function TabRenderLottery({ northProvinces, centralProvinces, southProvinces, deleteLottery, updateLottery, deleteMultiLottery }) {
    const [isNorthLotteryShow, setIsNorthLotteryShow] = useState(true);

    const [isCentralLotteryShow, setIsCentralLotteryShow] = useState(false);

    const [isSouthLotteryShow, setIsSouthLotteryShow] = useState(false);



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
                        setIsSouthLotteryShow(false);
                    }}
                        className={isCentralLotteryShow ? 'nav-link btn active' : 'nav-link btn'}>
                        Miền Trung
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={() => {
                        setIsSouthLotteryShow(true);
                        setIsNorthLotteryShow(false);
                        setIsCentralLotteryShow(false);
                    }}
                        className={isSouthLotteryShow ? 'nav-link btn active' : 'nav-link btn'}>
                        Miền Nam
                    </a>
                </li>

            </ul>

            {/* 4/4 RenderManagerLottery => RenderLottery */}
            {isNorthLotteryShow ? <RenderLottery
                region={'north'}
                provinces={northProvinces}
                updateLottery={updateLottery} />
                : null
            }

            {isCentralLotteryShow ? <RenderLottery
                region={'central'}
                provinces={centralProvinces}
                updateLottery={updateLottery} />
                : null
            }
            {isSouthLotteryShow ? <RenderLottery
                region={'south'}
                deleteMultiLottery={deleteMultiLottery}
                provinces={southProvinces}
                updateLottery={updateLottery} />
                : null
            }
        </div>
    )
}

function LotteryManager(props) {

    console.log('run');

    function region() {
        const region = document.getElementById('region').value;
        if (region === 'north') {
            document.getElementById('northForm').style.display = '';
            document.getElementById('centralSouthForm').style.display = 'none';


            document.getElementById('centralSelectProvince').style.display = 'none';
            document.getElementById('centralSelectProvince').setAttribute("disabled", true);

        } else if (region === 'south') {
            document.getElementById('northForm').style.display = 'none';
            document.getElementById('centralSouthForm').style.display = '';

            document.getElementById('centralSelectProvince').style.display = 'none';
            document.getElementById('centralSelectProvince').setAttribute("disabled", true);

            document.getElementById('southSelectProvince').style.display = '';
            document.getElementById('southSelectProvince').setAttribute("disabled", false);
        } else {
            document.getElementById('northForm').style.display = 'none';
            document.getElementById('centralSouthForm').style.display = '';

            document.getElementById('centralSelectProvince').style.display = '';
            document.getElementById('centralSelectProvince').setAttribute("disabled", false);

            document.getElementById('southSelectProvince').style.display = 'none';
            document.getElementById('southSelectProvince').setAttribute("disabled", true);
        }
    }

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
        //console.log(values)
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
                <div className='container mt-5'>

                    {/* Alert xóa lottery thành công. */}
                    <div id='alert-div' style={{ display: 'none' }} className='row pt-3'>
                        <div id='alert-message' role="alert">
                            This is a success alert—check it out!
                        </div>
                    </div>

                    {/* Button và modal thêm vé dò */}
                    <div className='container'>
                        <Button size='lg' color='primary' onClick={toggle}>Tạo xổ số mới</Button>
                        <Modal size='lg' isOpen={isOpen}>
                            <ModalHeader className='text-primary' toggle={toggle}>
                                THÊM THÔNG TIN VÉ SỐ
                            </ModalHeader>
                            <ModalBody>

                                {/*Select Vùng Miền*/}

                                <FormGroup row>
                                    <Label md={3} for='region'><b>Chọn Miền</b></Label>
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


                                {/*Form Miền Bắc */}
                                <Form model='northForm' onSubmit={(values) => handleSubmit(values)} id='northForm' style={{ 'display': 'none' }}>
                                    <Control.text model='.region' type='hidden' defaultValue={'north'} className='form-control' />

                                    {/* Tỉnh thành */}
                                    <FormGroup row>
                                        <Label md={3} htmlFor='province'><b>Tỉnh Thành</b></Label>
                                        <Col sm={9}>
                                            <Control.select model='.province' defaultValue={northProvinces[0]._id} className='form-control'>
                                                <SelectProvinces provinces={northProvinces} />
                                            </Control.select>
                                        </Col>
                                    </FormGroup>

                                    {/* Nhập Ngày */}
                                    <FormGroup row>
                                        <Label sm={3} htmlFor='.date'><b>Ngày</b></Label>
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
                                        <Label sm={3} for='special_prize'><b>Giải Đặc Biệt</b></Label>
                                        <Col sm={9}>
                                            <Control.text
                                                model='.special_prize'
                                                id='special_prize'
                                                name='special_prize'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".special_prize"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 1 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g1'><b>Giải 1</b></Label>
                                        <Col sm={9}>
                                            <Control.text
                                                model='.g1'
                                                id='g1'
                                                name='g1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                maxLength='5'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 2 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g2_1'><b>Giải 2</b></Label>
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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g2_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g2_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>


                                    {/* Giải 3 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g3_1'><b>Giải 3</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g3_1'
                                                id='g3_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g3_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g3_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g3_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g3_4"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g3_5"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'

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
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g3_6"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 4 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g4_1'><b>Giải 4</b></Label>
                                        <Col sm={2}>
                                            <Control.text
                                                model='.g4_1'
                                                id='g4_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'

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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_4"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 5 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g5_1'><b>Giải 5</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g5_1'
                                                id='g5_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5_4"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5_5"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5_6"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 6 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g6_1'><b>Giải 6</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g6_1'
                                                id='g6_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(3),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g6_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 3 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(3),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g6_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 3 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(3),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g6_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 3 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 7 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g7_1'><b>Giải 7</b></Label>
                                        <Col sm={2}>
                                            <Control.text
                                                model='.g7_1'
                                                id='g7_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(2),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g7_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 2 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(2),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g7_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 2 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(2),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g7_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 2 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                    validNumber: validNumber(2),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g7_4"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 2 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <Button color='primary' type='submit'>
                                        Tạo mới
                                    </Button>
                                    {' '}
                                    <Button onClick={() => { props.resetNorthForm(); toggle() }}>
                                        Hủy
                                    </Button>
                                    {' '}
                                    <Button
                                        onClick={() => {
                                            props.resetNorthForm();
                                        }}
                                        type='button'
                                        color='danger'>
                                        Reset
                                    </Button>

                                    {/* {' '}
                                    <Button onClick={handleResetNorthForm} type='button' color='danger'>Reset</Button> */}
                                </Form>

                                {/* Form Miền Trung và Nam*/}
                                <Form model='southCentralForm' onSubmit={(values) => handleSubmit(values)} id='centralSouthForm' style={{ 'display': 'none' }}>
                                    {/* Hidden value */}
                                    <Control.text model='.region' defaultValue={'centralSouth'} type='hidden' />

                                    {/* Tỉnh thành */}
                                    <FormGroup id='centralSelectProvince' row>
                                        <Label sm={3} for='province'><b>Tỉnh Thành</b></Label>
                                        <Col sm={9}>
                                            <Control.select model='.province' defaultValue={centralProvinces[0]._id} className='form-control'>
                                                <SelectProvinces provinces={centralProvinces} />
                                            </Control.select>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup id='southSelectProvince' row>
                                        <Label sm={3} for='province'><b>Tỉnh Thành</b></Label>
                                        <Col sm={9}>
                                            <Control.select model='.province' defaultValue={southProvinces[0]._id} className='form-control'>
                                                <SelectProvinces provinces={southProvinces} />
                                            </Control.select>
                                        </Col>
                                    </FormGroup>


                                    {/* Ngày */}
                                    <FormGroup row>
                                        <Label sm={3} htmlFor='.date'><b>Ngày</b></Label>
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

                                    {/* Giải 8 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g8'><b>Giải 8</b></Label>
                                        <Col sm={9}>
                                            <Control.text
                                                model='.g8'
                                                id='g8'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(2),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g8"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 2 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 7 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g7'><b>Giải 7</b></Label>
                                        <Col sm={9}>
                                            <Control.text
                                                model='.g7'
                                                id='g7'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(3),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g7"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 3 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 6 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g6'><b>Giải 6</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g6_1'
                                                id='g6_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g6_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g6_2'
                                                id='g6_2'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 3'
                                                maxLength='5'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g6_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                maxLength='5'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g6_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 5 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g5'><b>Giải 5</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g5'
                                                id='g5'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(4),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g5"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 4 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 4 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g4_1'><b>Giải 4</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_1'
                                                id='g4_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                min={0}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_2'
                                                id='g4_2'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 2'
                                                min={0}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_3'
                                                id='g4_3'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 3'
                                                min={0}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_3"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={3}></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_4'
                                                id='g4_4'
                                                min={0}
                                                type='number'
                                                className='form-control'
                                                placeholder='number 4'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_4"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_5'
                                                id='g4_5'
                                                type='number'
                                                min={0}
                                                className='form-control'
                                                placeholder='number 5'

                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_5"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_6'
                                                id='g4_6'
                                                type='number'
                                                min={0}
                                                className='form-control'
                                                placeholder='number 6'
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_6"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={3}></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g4_7'
                                                id='g4_7'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 4'
                                                min={"0"}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g4_7"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 3 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g3'><b>Giải 3</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g3_1'
                                                id='g3'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                min={"0"}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model='.g3_1'
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
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
                                                min={"0"}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model='.g3_2'
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải 2 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g2'><b>Giải 2</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g2'
                                                id='g2'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                min={"0"}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g2"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>

                                    </FormGroup>

                                    {/* Giải 1 */}
                                    <FormGroup row>
                                        <Label sm={3} for='g1_1'><b>Giải 1</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                model='.g1'
                                                id='g1_1'
                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                min={"0"}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(5),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".g1"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 5 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    {/* Giải Đặc Biệt */}
                                    <FormGroup row>
                                        <Label sm={3} for='specialprize'><b>Giải Đặc Biệt</b></Label>
                                        <Col sm={3}>
                                            <Control.text
                                                id='specialprize'
                                                model='.special_prize'

                                                type='number'
                                                className='form-control'
                                                placeholder='number 1'
                                                min={"0"}
                                                validators={{
                                                    required,
                                                    validNumber: validNumber(6),
                                                    isPositive
                                                }}
                                            />
                                            <Errors
                                                className="errors"
                                                model=".special_prize"
                                                show="touched"
                                                messages={{
                                                    required: 'Không được để trống!',
                                                    validNumber: 'Yêu cầu đủ 6 số!',
                                                    isPositive: 'Số không hợp lệ!'
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <Button color='primary' type='submit'>
                                        Tạo mới
                                    </Button>
                                    {' '}
                                    <Button onClick={() => { props.resetSouthCentralForm(); toggle() }}>
                                        Hủy
                                    </Button>
                                    {' '}
                                    <Button
                                        onClick={() => {
                                            props.resetSouthCentralForm();
                                        }}
                                        type='button'
                                        color='danger'>
                                        Reset
                                    </Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </div>
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