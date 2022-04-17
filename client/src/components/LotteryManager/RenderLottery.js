import React, { useEffect, useState } from 'react';
import { baseURL } from '../../shared/baseURL';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Input } from 'reactstrap'
import axios from 'axios';
import querystring from 'query-string';
import moment from 'moment'
import NorthModalUpdate from './NorthModalUpdate';
import SouthCentralModalUpdate from './SouthCentralModalUpdate';
import { deleteLottery, deleteMultiLottery } from '../../redux/Actions/LotteryActions'
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

const mapDispatchToProps = dispatch => ({
    deleteLottery: (provinceId, lotteryId) => dispatch(deleteLottery(provinceId, lotteryId)),
    deleteMultiLottery: (data) => dispatch(deleteMultiLottery(data))
})

// Global variable
let multiDeleteDataGlobal = [];
let isCheckBoxDeleteHidden = true;

function RenderRowTable(props) {
    //Để lưu giá trị provinceId khi click update ở row => truyền xuống modal form update
    const [updateLottery, setUpdateLottery] = useState({
        lottery: null,
        provinceId: null
    })

    //UseState open update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const toggleUpdate = () => { setIsUpdateOpen(!isUpdateOpen) };

    function handleButtonUpdate(lottery, provinceId) {
        setUpdateLottery({
            lottery: lottery,
            provinceId: provinceId
        })

        toggleUpdate();
    }

    //Truyền data từ button xóa trong row
    const [dataDelete, setdataDelete] = useState([]);

    // Modal confirm delete
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const toggleConfirm = () => { setIsConfirmDeleteOpen(!isConfirmDeleteOpen) }

    function handleDelete(provinceId, lotteryId) {
        console.log(provinceId, lotteryId)
        props.deleteLottery(provinceId, lotteryId)
    }

    const handleClose = () => {
        toggleUpdate()
    }


    // Delete Bulk ---------------------------------------------------

    const [isButtonBulkDeleteShow, setIsButtonBulkDeleteShow] = useState(false);
    const toggleBulkButtonDeleteShow = () => { setIsButtonBulkDeleteShow(!isButtonBulkDeleteShow) }

    // Modal confirm delete
    const [isConfirmBulkDeleteOpen, setIsConfirmBulkDeleteOpen] = useState(false);
    const toggleConfirmBulk = () => { setIsConfirmBulkDeleteOpen(!isConfirmBulkDeleteOpen) }

    function handleConfirmMultiDelete() {
        props.deleteMultiLottery(multiDeleteDataGlobal);
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

    let numberOrder = 0;
    const rows = props.province.lottery.map(lottery => {
        numberOrder++;
        if (lottery) {
            return (
                <tr>
                    <th scope="row">
                        {numberOrder}
                    </th>

                    <td>
                        {props.province.province}
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
                                <Button onClick={() => { handleButtonUpdate(lottery, props.province._id); }} block color='primary'>Cập nhật</Button>
                            </div>
                            <div className='col-lg-6 my-1'>
                                <Button onClick={() => { setdataDelete([props.province._id, lottery._id]); toggleConfirm() }} block color='danger'>Xóa</Button>
                            </div>

                        </div>
                    </td>


                    <td hidden={isCheckBoxDeleteHidden} className='text-center'>
                        <Input size={'lg'}
                            type="checkbox"
                            className='checkboxDelete'
                            onClick={() => {
                                multiDeleteDataGlobal = [...multiDeleteDataGlobal, { provinceId: props.province._id, lotteryId: lottery._id }]
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
    })

    return (
        <div>
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

            {/* Table */}
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
                        {rows}
                    </tbody>
                </Table>
            </div>

            {/* Modal Confirm Delete */}
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

            {
                isUpdateOpen && props.region === 'north' ? <NorthModalUpdate
                    isOpen={true}
                    lotteryUpdate={updateLottery.lottery}
                    provinceId={updateLottery.provinceId}
                    handleClose={handleClose}
                /> : null

            }
            {
                (isUpdateOpen && props.region === 'south') || isUpdateOpen && props.region === 'central' ? <SouthCentralModalUpdate
                    isOpen={true}
                    lotteryUpdate={updateLottery.lottery}
                    provinceId={updateLottery.provinceId}
                    handleClose={handleClose}
                /> : null
            }

        </div>
    )
}

function RenderLottery(props) {

    function handleButtonProvince(province) {
        setFilters({
            page: 1,
            provinceId: province._id
        })
    }

    const buttons = props.provinces.map(province => {
        return (
            <div key={province._id} className='col-md-3 col-sm-4 my-1'>
                <Button
                    block
                    color='primary'
                    onClick={() => { handleButtonProvince(province) }}>{province.province}
                </Button>
            </div>
        )
    })

    // -------------> useEffect
    function handlePageChange(newPage) {
        setFilters({ ...filters, page: newPage });
    }

    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 0
    });

    const page = pagination.page;
    const totalPages = pagination.totalPages;

    const [province, setProvince] = useState();

    const [filters, setFilters] = useState({
        provinceId: props.provinces.find(province => province.region === props.region)._id,
        page: 1,
    });

    let currentPage = page;
    let previousPage = page - 1;
    const hasPreviousPage = page > 1;
    const hasNextPage = totalPages > page;
    const nextPage = page + 1;
    const lastPage = totalPages;

    useEffect(() => {
        try {
            async function fetchLottery() {
                const paramsString = querystring.stringify(filters);
                //console.log(paramsString)
                const requestURL = baseURL + `test/?${paramsString}`;
                await axios.get(requestURL)
                    .then(response => response.data)
                    .then(data => {
                        //console.log(data)
                        setProvince(data.province);
                        setPagination({
                            page: filters.page,
                            totalPages: Math.ceil(data.totalRows / 10)
                        });
                    })
            }
            fetchLottery()
        } catch (error) {
            console.log(error);
        }
    }, [filters]);


    if (province) {
        return (
            <div>
                {/* Province button */}
                <div className='container my-5'>
                    <div className='row'>
                        {buttons}
                    </div>
                </div>

                {/* Render Table */}
                <RenderRowTable
                    province={province}
                    region={props.region}
                    deleteLottery={props.deleteLottery}
                    deleteMultiLottery={props.deleteMultiLottery}
                />

                {/* Pagination */}
                <div>
                    <Button disabled={!hasPreviousPage} onClick={() => handlePageChange(page - 1)}>Trang sau</Button>
                    {' '}
                    <Button hidden={!(currentPage !== 1 && previousPage !== 1)} onClick={() => handlePageChange(1)}>1</Button>
                    {' '}
                    <Button hidden={!hasPreviousPage} onClick={() => handlePageChange(page - 1)}>{previousPage}</Button>
                    {' '}
                    <Button color='primary' size='lg'>{page}</Button>
                    {' '}
                    <Button hidden={!hasNextPage} onClick={() => handlePageChange(totalPages)}>{lastPage}</Button>
                    {' '}
                    <Button disabled={!hasNextPage} onClick={() => handlePageChange(nextPage)}>Next page</Button>
                </div>
            </div>
        )

    } else {
        return (
            <></>
        )
    }
}

export default connect(null, mapDispatchToProps)(RenderLottery)
