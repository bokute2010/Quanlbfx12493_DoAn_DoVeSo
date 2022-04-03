import React, { useState, useEffect } from 'react'
import { Button, Col, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Input } from 'reactstrap'
import { Control, Errors, LocalForm } from 'react-redux-form'
import './index.css';
import moment from 'moment'
import { required, validNumber, isPositive } from './validation-form';

// Global variable
let multiDeleteDataGlobal = [];
let isCheckBoxDeleteHidden = true;

function RenderRowTable({ region, provinces, deleteLottery, updateLottery }) {
    //Số thứ tự cho row
    let numberOrder = 0;

    //UseState open update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const toggleUpdate = () => { setIsUpdateOpen(!isUpdateOpen) };

    //Để lưu giá trị provinceId khi click update ở row => truyền xuống modal form update
    const [provinceUpdateId, setProvinceUpdateId] = useState()
    const [lotteryUpdate, setLotteryUpdate] = useState()

    //Hàm xử lý update
    function handleUpdate(values) {
        const g2 = [values.g2_1, values.g2_2];
        const g3 = [values.g3_1, values.g3_2, values.g3_3, values.g3_4, values.g3_5, values.g3_6];
        const g4 = [values.g4_1, values.g4_2, values.g4_3, values.g4_4];
        const g5 = [values.g5_1, values.g5_2, values.g5_3, values.g5_4, values.g5_5, values.g5_6];
        const g6 = [values.g6_1, values.g6_2, values.g6_3];
        const g7 = [values.g7_1, values.g7_2, values.g7_3, values.g7_4];

        const lottery = {
            _id: lotteryUpdate._id,
            date: values.date,
            special_prize: values.special_prize,
            g1: values.g1,
            g2: g2,
            g3: g3,
            g4: g4,
            g5: g5,
            g6: g6,
            g7: g7
        }
        updateLottery(provinceUpdateId, lottery);
        toggleUpdate();
    }

    //#region Xử lý nút Xóa
    //Truyền data từ button xóa trong row
    const [dataDelete, setdataDelete] = useState([]);

    // Modal confirm delete
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const toggleConfirm = () => { setIsConfirmDeleteOpen(!isConfirmDeleteOpen) }

    //Hàm xử lý delete
    function handleDelete(provinceId, lotteryId) {

        deleteLottery(provinceId, lotteryId)


    }
    //#endregion

    function handleButtonUpdate(lottery, provinceId) {
        setProvinceUpdateId(provinceId);
        setLotteryUpdate(lottery)
    }
    const [validationObject, setValidationObject] = useState({});

    const rows = provinces.map(province => {
        //Giới hạn row
        let rowsLimit = 10;
        return province.lottery.map(lottery => {
            if (lottery) {
                if (rowsLimit > 0) {
                    rowsLimit--;
                    numberOrder++;
                    return (
                        <tr>
                            <th scope="row">
                                {numberOrder}
                            </th>
                            <td>
                                {province.province}
                            </td>
                            <td>
                                {moment(lottery.date).format('DD-MM-YYYY')}
                            </td>
                            <td>
                                {lottery.special_prize}
                            </td>
                            <td>
                                <div className='row'>
                                    <div className='col-lg-6 my-1'>
                                        <Button onClick={() => { handleButtonUpdate(lottery, province._id); toggleUpdate(); }} block color='primary'>Cập nhật</Button>
                                    </div>
                                    <div className='col-lg-6 my-1'>
                                        <Button onClick={() => { setdataDelete([province._id, lottery._id]); setIsConfirmDeleteOpen(true) }} block color='danger'>Xóa</Button>
                                    </div>

                                </div>
                            </td>
                            <td hidden={isCheckBoxDeleteHidden} className='text-center'>
                                <Input size={'lg'}
                                    type="checkbox"
                                    className='checkboxDelete'
                                    onClick={() => {
                                        multiDeleteDataGlobal = [...multiDeleteDataGlobal, { provinceId: province._id, lotteryId: lottery._id }]
                                    }}
                                />
                            </td>

                        </tr>
                    )
                } else {
                    return (
                        <></>
                    )
                }
            } else {
                return (
                    <></>
                )
            }
        })

    })

    return (
        <>
            {/* Render các row dữ liệu */}
            {rows}

            {/* Model Delete */}
            <Modal isOpen={isConfirmDeleteOpen} >
                <ModalHeader toggle={toggleConfirm}>XÁC NHẬN</ModalHeader>
                <ModalBody>Bạn có chắc chắn muốn xóa thông tin này?</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { handleDelete(dataDelete[0], dataDelete[1]) }}
                    >
                        OK
                    </Button>
                    {' '}
                    <Button onClick={toggleConfirm}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal Update miền Bắc */}
            {region === 'north' ? <Modal size='lg' isOpen={isUpdateOpen}>
                <ModalHeader className='text-primary' toggle={toggleUpdate}>
                    <b>CẬP NHẬT THÔNG TIN VÉ DÒ</b>
                </ModalHeader>
                <ModalBody>
                    {/*Form Miền Bắc */}
                    <LocalForm onSubmit={(values) => handleUpdate(values)}>
                        {/* Nhập Ngày */}
                        <FormGroup row>
                            <Label sm={3} htmlFor='.date'><b>Ngày</b></Label>
                            <Col sm={9}>
                                <Control.text
                                    id='.date'
                                    className='form-control'
                                    type='date'
                                    defaultValue={lotteryUpdate ? moment(lotteryUpdate.date).format('YYYY-MM-DD') : null}
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
                                    type='number'
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.special_prize) : null}
                                    validators={validationObject}
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
                                    type='number'
                                    className='form-control'
                                    placeholder='number 1'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g1) : null}
                                    maxLength='5'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g2[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g2[1]) : null}
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3} for='g3_1'>Giải 3</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_1'
                                    id='g3_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[4]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[5]) : null}
                                    className='form-control'
                                    placeholder='number 5'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[5]) : null}
                                    className='form-control'
                                    placeholder='number 6'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3} for='g4_1'>Giải 4</Label>
                            <Col sm={2}>
                                <Control.text
                                    model='.g4_1'
                                    id='g4_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3} for='g5_1'>Giải 5</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_1'
                                    id='g5_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[1]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3}></Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_4'
                                    id='g5_4'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[4]) : null}
                                    className='form-control'
                                    placeholder='number 5'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[5]) : null}
                                    className='form-control'
                                    placeholder='number 6'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3} for='g6_1'>Giải 6</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g6_1'
                                    id='g6_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(3),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(3),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(3),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3} for='g7_1'>Giải 7</Label>
                            <Col sm={2}>
                                <Control.text
                                    model='.g7_1'
                                    id='g7_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(2),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    id='g7_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(2),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(2),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Col sm={3}>
                                <Control.text
                                    model='.g7_4'
                                    id='g7_4'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(2),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            Cập nhật
                        </Button>
                        {' '}
                        <Button onClick={toggleUpdate}>
                            Hủy
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal> : null}

            {/* Modal Update miền Trung và Nam */}
            {(region === 'central' || region === 'south') ? <Modal size='lg' isOpen={isUpdateOpen}>
                <ModalHeader className='text-primary' toggle={toggleUpdate}>
                    <b>CẬP NHẬT THÔNG TIN VÉ DÒ</b>
                </ModalHeader>
                <ModalBody>
                    {/*Form Miền Bắc */}
                    <LocalForm onSubmit={(values) => handleUpdate(values)}>
                        {/* Nhập Ngày */}
                        <FormGroup row>
                            <Label sm={3} htmlFor='.date'>Ngày</Label>
                            <Col sm={9}>
                                <Control.text
                                    id='.date'
                                    className='form-control'
                                    type='date'
                                    defaultValue={lotteryUpdate ? moment(lotteryUpdate.date).format('YYYY-MM-DD') : null}
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
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(6),
                                        isPositive
                                    })}
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.special_prize) : null}
                                    validators={validationObject}
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
                            <Label sm={3} for='g1'>Giải 1</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g1'
                                    id='g1'
                                    type='number'
                                    className='form-control'
                                    placeholder='number 1'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g1) : null}
                                    maxLength='5'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                            <Label sm={3} for='g2'>Giải 2</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g2'
                                    id='g2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g2) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        {/* Giải 3 */}
                        <FormGroup row>
                            <Label sm={3} for='g3_1'>Giải 3</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_1'
                                    id='g3_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        </FormGroup>

                        {/* Giải 4 */}
                        <FormGroup row>
                            <Label sm={3} for='g4_1'>Giải 4</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g4_1'
                                    id='g4_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[4]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[5]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[6]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(5),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        {/* Giải 5 */}
                        <FormGroup row>
                            <Label sm={3} for='g5'>Giải 5</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5'
                                    id='g5'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        {/* Giải 6 */}
                        <FormGroup row>
                            <Label sm={3} for='g6_1'>Giải 6</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g6_1'
                                    id='g6_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(4),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        {/* Giải 7 */}
                        <FormGroup row>
                            <Label sm={3} for='g7'>Giải 7</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g7'
                                    id='g7'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(3),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        {/* Giải 8 */}
                        <FormGroup row>
                            <Label sm={3} for='g8'>Giải 8</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g8'
                                    id='g7'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g8[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                    onFocus={() => setValidationObject({
                                        required,
                                        validNumber: validNumber(2),
                                        isPositive
                                    })}
                                    validators={validationObject}
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

                        <Button color='primary' type='submit'>
                            Cập nhật
                        </Button>
                        {' '}
                        <Button onClick={toggleUpdate}>
                            Hủy
                        </Button>
                    </LocalForm>

                </ModalBody>
            </Modal> : null}
        </>
    );
}

const RenderManagerLottery = ({ region, provinces, deleteLottery, updateLottery, deleteMultiLottery }) => {

    const [isSpecifyLotteryShow, setIsSpecifyLotteryShow] = useState(false);
    const [specifyProvince, setSpecifyProvince] = useState([]);

    const [isAllLotteryShow, setAllLotteryShow] = useState(true);

    const buttons = provinces.map(province => {
        return (
            <div key={province._id} className='col-md-3 col-sm-4 my-1'>
                <Button
                    block
                    color='primary'
                    onClick={() => { setIsSpecifyLotteryShow(true); setSpecifyProvince([province]); setAllLotteryShow(false) }}>{province.province}
                </Button>
            </div>
        )
    })

    // Delete Bulk ---------------------------------------------------

    const [isButtonBulkDeleteShow, setIsButtonBulkDeleteShow] = useState(false);
    const toggleBulkButtonDeleteShow = () => { setIsButtonBulkDeleteShow(!isButtonBulkDeleteShow) }

    // Modal confirm delete
    const [isConfirmBulkDeleteOpen, setIsConfirmBulkDeleteOpen] = useState(false);
    const toggleConfirmBulk = () => { setIsConfirmBulkDeleteOpen(!isConfirmBulkDeleteOpen) }

    function handleConfirmMultiDelete() {
        deleteMultiLottery(multiDeleteDataGlobal);
        multiDeleteDataGlobal = [];
        isCheckBoxDeleteHidden = true
        toggleBulkButtonDeleteShow();
    }

    function handleCancelMultiDelete() {
        const elements = document.getElementsByClassName('checkboxDelete')

        for (let item of elements) {
            item.checked = false;
        }

        multiDeleteDataGlobal = [];

        if (isConfirmBulkDeleteOpen) {
            toggleConfirmBulk();
        }

        toggleBulkButtonDeleteShow();
        isCheckBoxDeleteHidden = true
    }

    return (
        <>
            {/* Province button */}
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-3 col-sm-4 my-1'>
                        <Button
                            block
                            color='light'
                            className="border border-danger"
                            onClick={() => { setAllLotteryShow(true); setIsSpecifyLotteryShow(false) }}>
                            <b>{region === 'north' ? "Miền Bắc" : null}</b>
                            <b>{region === 'central' ? "Miền Trung" : null}</b>
                            <b>{region === 'south' ? "Miền Nam" : null}</b>
                        </Button>
                    </div>
                    {buttons}
                </div>
            </div>

            {/* Delete Multi Button */}

            <div className='container my-4'>
                <div className='d-flex align-items-end justify-content-end'>
                    <Button
                        hidden={isButtonBulkDeleteShow}
                        size={'lg'}
                        onClick={() => {
                            isCheckBoxDeleteHidden = false;
                            toggleBulkButtonDeleteShow()
                        }}
                        color='danger'
                    >
                        Bulk delete
                    </Button>
                </div>
            </div>

            {/* Table show data */}
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Tỉnh Thành
                            </th>
                            <th>
                                Ngày
                            </th>
                            <th>
                                Giải Đặc Biệt
                            </th>
                            <th>

                            </th>
                            <th hidden={isCheckBoxDeleteHidden} className='text-center'>
                                <Button onClick={() => { multiDeleteDataGlobal.length > 0 ? toggleConfirmBulk() : alert('Vui lòng chọn trước khi xóa!') }} color='danger'>Xác nhận</Button> {' '}
                                <Button onClick={() => { handleCancelMultiDelete() }}>Hủy bỏ</Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSpecifyLotteryShow ? <RenderRowTable region={region} updateLottery={updateLottery} deleteLottery={deleteLottery} provinces={specifyProvince} /> : null}
                        {isAllLotteryShow ? <RenderRowTable region={region} updateLottery={updateLottery} deleteLottery={deleteLottery} provinces={provinces} /> : null}
                    </tbody>
                </Table>

                {/* Model Confirm Bulk Delete */}
                <Modal isOpen={isConfirmBulkDeleteOpen} >
                    <ModalHeader toggle={toggleConfirmBulk}>Xác Nhận</ModalHeader>
                    <ModalBody>Bạn có chắc chắn muốn xóa thông tin này?</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => { handleConfirmMultiDelete() }}
                        >
                            OK
                        </Button>
                        {' '}
                        <Button onClick={() => handleCancelMultiDelete()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>


            </div>
        </>
    )
}

export default RenderManagerLottery