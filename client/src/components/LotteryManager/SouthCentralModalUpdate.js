import React, { useState } from 'react'
import { Button, Col, FormGroup, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Control, Errors, Form, actions } from 'react-redux-form'
import './index.css';
import moment from 'moment'
import { required, validNumber, isPositive } from '../validation-form';
import { updateLottery } from '../../redux/Actions/LotteryActions'
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    updateLottery: (provinceId, lottery) => dispatch(updateLottery(provinceId, lottery)),
    resetSouthCentralForm: () => dispatch(actions.reset('southCentralForm'))
})

function SouthCentralModalUpdate({ provinceId, isOpen, lotteryUpdate, handleClose, updateLottery, resetSouthCentralForm }) {
    //UseState open update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(isOpen);
    const toggleUpdate = () => { setIsUpdateOpen(!isUpdateOpen); handleClose() };

    const [validationObject, setValidationObject] = useState({});

    //Hàm xử lý update
    function handleUpdate(values) {
        //console.log(values);
        const g2 = [values.g2];
        const g3 = [values.g3_1, values.g3_2];
        const g4 = [values.g4_1, values.g4_2, values.g4_3, values.g4_4, values.g4_5, values.g4_6, values.g4_7];
        const g5 = [values.g5];
        const g6 = [values.g6_1, values.g6_2, values.g6_3];
        const g7 = [values.g7];
        const g8 = [values.g8];

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
            g7: g7,
            g8: g8
        }

        // console.log(lottery)
        updateLottery(provinceId, lottery);
        toggleUpdate();
    }

    return (
        <Modal size='lg' isOpen={isUpdateOpen}>
            <ModalHeader className='text-primary' toggle={toggleUpdate}>
                <b>CẬP NHẬT THÔNG TIN VÉ DÒ</b>
            </ModalHeader>
            <ModalBody>

                <Form model='southCentralForm' onSubmit={(values) => handleUpdate(values)}>
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
                    <Button onClick={() => { resetSouthCentralForm(); toggleUpdate(); setValidationObject({}) }}>
                        Hủy
                    </Button>
                    {' '}
                    <Button
                        onClick={() => {
                            resetSouthCentralForm();
                            setValidationObject({
                                required,
                                validNumber: validNumber(5),
                                isPositive
                            })
                        }}
                        type='button'
                        color='danger'>
                        Reset
                    </Button>
                </Form>

            </ModalBody>
        </Modal>
    )
}

export default connect(null, mapDispatchToProps)(SouthCentralModalUpdate)