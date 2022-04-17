import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios';
import { baseURL } from '../../shared/baseURL';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({

})


function UserList(props) {
    const { users } = props;
    let userCount = 0;

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const toggleDelete = () => setIsDeleteOpen(!isDeleteOpen);
    const [userDeleteId, setUserDeleteId] = useState();

    const [userResetPw, setUserResetPw] = useState();
    const [idTemporary, setIdTemporary] = useState();

    const [isResetOpen, setIsResetOpen] = useState(false);
    const toggleResetPw = () => setIsResetOpen(!isResetOpen);

    useEffect(() => {
        if (userResetPw) {
            async function resetPassword() {
                try {
                    await axios.post(baseURL + `users/reset-password/?userId=${userResetPw}`)
                        .then((response => response.data))
                        .then(data => {
                            props.onChangeAlert({
                                success: true,
                                message: data.alertMess
                            })
                        })
                    setUserResetPw()
                } catch (error) {
                    props.onChangeAlert({
                        success: false,
                        message: 'Cài lại mật khẩu thất bại!'
                    })
                }
            }
            resetPassword()
            setUserResetPw()
        }

        // Set time out to hide Alert Mess
        const myAlertMess = setTimeout(() => {
            props.onChangeAlert()
        }, 5000)

        return () => {
            clearTimeout(myAlertMess)
        }

    }, [userResetPw])


    const userRows = users.map(user => {
        userCount++;
        return (
            <tr key={user._id}>
                <th scope="row">{userCount}</th>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.phone}
                </td>
                <td>
                    <div className='row'>
                        <div className='col-lg-4 my-1'>
                            <Button onClick={() => { props.handleButtonUpdate(user); }} block color='primary'>Cập nhật</Button>
                        </div>
                        <div className='col-lg-4 my-1'>
                            <Button onClick={() => { setIdTemporary(user._id); toggleResetPw() }} block color='info'>Reset pw</Button>
                        </div>
                        <div hidden={!props.isUser} className='col-lg-4 my-1'>
                            <Button onClick={() => { setUserDeleteId(user._id); toggleDelete() }} block color='danger'>Xóa</Button>
                        </div>

                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div  >
            {/* Table show data */}
            <Table hover>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Họ Tên
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Số điện thoại
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userRows}
                </tbody>
            </Table>

            {/* Modal Confirm Delete */}
            <Modal isOpen={isDeleteOpen} >
                <ModalHeader toggle={toggleDelete}>{props.onDeleteUser ? 'XÁC NHẬN' : 'CẢNH BÁO'}</ModalHeader>
                <ModalBody>{props.onDeleteUser ? 'Bạn có chắc chắn muốn xóa user này?' : 'Người này là admin không thể xóa!'}</ModalBody>
                <ModalFooter>
                    <Button hidden={!props.onDeleteUser}
                        color="primary"
                        onClick={() => { props.onDeleteUser(userDeleteId); toggleDelete() }}
                    >
                        OK
                    </Button>
                    {' '}
                    <Button onClick={toggleDelete}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal Reset Password */}
            <Modal isOpen={isResetOpen} >
                <ModalHeader toggle={toggleResetPw}>XÁC NHẬN</ModalHeader>
                <ModalBody>Bạn có chắc chắn muốn reset mật khẩu người dùng này?</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { setUserResetPw(idTemporary); toggleResetPw() }}
                    >
                        OK
                    </Button>
                    {' '}
                    <Button onClick={toggleResetPw}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal create & update user */}
        </div>
    );
}

export default connect(null, mapDispatchToProps)(UserList);