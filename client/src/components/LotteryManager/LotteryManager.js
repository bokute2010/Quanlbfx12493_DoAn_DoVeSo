import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Control, LocalForm } from 'react-redux-form'

function region() {
    const region = document.getElementById('region').value;
    console.log('Hello')
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

function RenderNorthLottery({ northLottery }) {
    console.log(northLottery)
    return (
        <div>
            <h1>North Lottery
            </h1>
        </div>
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



function TabRenderLottery({ props }) {
    const [isNorthLotteryShow, setIsNorthLotteryShow] = useState(false);
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

            {isNorthLotteryShow ? <RenderNorthLottery northLottery={props.north} /> : null}
            {isCentralLotteryShow ? <RenderCentralLottery /> : null}
            {isSouthLotteryShow ? <RenderSouthLottery /> : null}
        </div>

    )
}




function LotteryManager(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleSubmit = (values) => {
        props.createLottery(values)
        //console.log(values)
    }

    return (
        <>
            <div className='container'>
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
                                    <Control.select model='.province' defaultValue={props.provinces.north[0]._id} className='form-control'>
                                        <SelectProvinces provinces={props.provinces.north} />
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

                            {/* Giải Đặc Biệt */}
                            <FormGroup row>
                                <Label sm={3} for='special_prize'>Giải Đặc Biệt</Label>
                                <Col sm={9}>
                                    <Control.text
                                        model='.special_prize'
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
                                        className='form-control'
                                        placeholder='number 1'
                                    />
                                </Col>
                                <Col sm={5}>
                                    <Control.text
                                        model='.g2_2'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 1'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g3_2'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 2'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g3_3'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 4'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g3_5'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 5'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g3_6'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 1'
                                    />

                                </Col>
                                <Col sm={2}>
                                    <Control.text
                                        model='.g4_2'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 2'
                                    />

                                </Col>
                                <Col sm={2}>
                                    <Control.text
                                        model='.g4_3'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 3'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g4_4'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 1'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g5_2'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 2'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g5_3'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 4'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g5_5'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 5'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g5_6'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 1'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g6_2'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 2'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g6_3'
                                        type='number'
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
                                        className='form-control'
                                        placeholder='number 1'
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Control.text
                                        model='.g7_2'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 2'
                                    />

                                </Col>
                                <Col sm={2}>
                                    <Control.text
                                        model='.g7_3'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 3'
                                    />

                                </Col>
                                <Col sm={3}>
                                    <Control.text
                                        model='.g7_4'
                                        type='number'
                                        className='form-control'
                                        placeholder='number 4'
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
                                    <Control.select model='.province' defaultValue={props.provinces.central[0]._id} className='form-control'>
                                        <SelectProvinces provinces={props.provinces.central} />
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
                                    <Control.select model='.province' defaultValue={props.provinces.south[0]._id} className='form-control'>
                                        <SelectProvinces provinces={props.provinces.south} />
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
                {/* <Button onClick={funcNorthLotteryShow} color='primary'>
                    Miền Bắc
                </Button> */}


            </div>
            <TabRenderLottery provinces={props.provinces} />

        </>
    )

}

export default LotteryManager