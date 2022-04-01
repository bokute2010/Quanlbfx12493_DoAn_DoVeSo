import React, { useState } from 'react'
import { Button, Col, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Input } from 'reactstrap'
import { Control, Errors, LocalForm } from 'react-redux-form'
import moment from 'moment';
import { required, validNumber } from './validation-form'

function ModelUpdate(props) {
    //UseState open update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(true);
    const toggleUpdate = () => { setIsUpdateOpen(!isUpdateOpen) };

    const lotteryUpdate = props.lotteryUpdate;
    const provinceUpdateId = props.provinceUpdateId;
    const updateLottery = props.updateLottery

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
        isUpdateOpen = false;
    }

    return (
        <>
            {/* Modal Update */}
            <Modal size='lg' isOpen={isUpdateOpen}>
                <ModalHeader toggle={toggleUpdate}>
                    Update Vé Dò
                </ModalHeader>
                <ModalBody>
                    {/*Form Miền Bắc */}
                    <LocalForm onSubmit={(values) => handleUpdate(values,)}>
                        {/* Ngày */}
                        <Row className='form-group'>
                            <Label sm={3} for='date'>Ngày</Label>
                            <Col sm={9}>
                                <Control.text
                                    className='form-control'
                                    type='date'
                                    model='.date'
                                    defaultValue={lotteryUpdate ? moment(lotteryUpdate.date).format('YYYY-MM-DD') : null}
                                    validators={{ required }}
                                />
                                <Errors
                                    className="errors"
                                    model=".date"
                                    show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                            </Col>
                        </Row>
                        <FormGroup row>

                        </FormGroup>

                        {/* Giải Đặc Biệt */}
                        <FormGroup row>
                            <Label sm={3} for='special_prize'>Giải Đặc Biệt</Label>
                            <Col sm={9}>
                                <Control.text
                                    model='.special_prize'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.special_prize) : null}
                                    type='number'
                                    className='form-control'
                                    placeholder='number 1'
                                />
                            </Col>
                        </FormGroup>

                        {/* Giải 1 */}
                        <FormGroup row>
                            <Label sm={3} for='g1'>Giải Nhất</Label>
                            <Col sm={9}>
                                <Control.text
                                    model='.g1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g1) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />
                            </Col>
                        </FormGroup>

                        {/* Giải 2 */}
                        <FormGroup row>
                            <Label sm={3} for='g2_1'>Giải Nhì</Label>
                            <Col sm={4}>
                                <Control.text
                                    model='.g2_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g2[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />
                            </Col>
                            <Col sm={5}>
                                <Control.text
                                    model='.g2_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g2[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                />
                            </Col>
                        </FormGroup>

                        {/* Giải 3 */}
                        <FormGroup row>
                            <Label sm={3} for='g3_1'>Giải 3</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_3'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}></Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_4'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_5'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[4]) : null}
                                    className='form-control'
                                    placeholder='number 5'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g3_6'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g3[5]) : null}
                                    className='form-control'
                                    placeholder='number 6'
                                />
                            </Col>
                        </FormGroup>

                        {/* Giải 4 */}
                        <FormGroup row>
                            <Label sm={3} for='g4_1'>Giải 4</Label>
                            <Col sm={2}>
                                <Control.text
                                    model='.g4_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />

                            </Col>
                            <Col sm={2}>
                                <Control.text
                                    model='.g4_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                />

                            </Col>
                            <Col sm={2}>
                                <Control.text
                                    model='.g4_3'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g4_4'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g4[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                />

                            </Col>
                        </FormGroup>

                        {/* Giải 5 */}
                        <FormGroup row>
                            <Label sm={3} for='g3_1'>Giải 5</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_3'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}></Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_4'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_5'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[4]) : null}
                                    className='form-control'
                                    placeholder='number 5'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g5_6'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g5[5]) : null}
                                    className='form-control'
                                    placeholder='number 6'
                                />
                            </Col>
                        </FormGroup>

                        {/* Giải 6 */}
                        <FormGroup row>
                            <Label sm={3} for='g6_1'>Giải 6</Label>
                            <Col sm={3}>
                                <Control.text
                                    model='.g6_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g6_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g6_3'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g6[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                />

                            </Col>
                        </FormGroup>

                        {/* Giải 7 */}
                        <FormGroup row>
                            <Label sm={3} for='g7_1'>Giải 7</Label>
                            <Col sm={2}>
                                <Control.text
                                    model='.g7_1'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[0]) : null}
                                    className='form-control'
                                    placeholder='number 1'
                                />
                            </Col>
                            <Col sm={2}>
                                <Control.text
                                    model='.g7_2'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[1]) : null}
                                    className='form-control'
                                    placeholder='number 2'
                                />

                            </Col>
                            <Col sm={2}>
                                <Control.text
                                    model='.g7_3'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[2]) : null}
                                    className='form-control'
                                    placeholder='number 3'
                                />

                            </Col>
                            <Col sm={3}>
                                <Control.text
                                    model='.g7_4'
                                    type='number'
                                    defaultValue={lotteryUpdate ? parseInt(lotteryUpdate.g7[3]) : null}
                                    className='form-control'
                                    placeholder='number 4'
                                />

                            </Col>
                        </FormGroup>

                        <Button color='primary' type='submit'>
                            Cập nhật
                        </Button>
                        {' '}
                        <Button onClick={() => { isUpdateOpen = !isUpdateOpen }}>
                            Hủy
                        </Button>
                    </LocalForm>

                </ModalBody>
            </Modal>
        </>
    )
}

export default ModelUpdate