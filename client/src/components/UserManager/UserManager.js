import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { baseURL } from '../../shared/baseURL'
import Pagination from '../Pagination'
import Search from './Search'
import UserList from './UserList'
import querystring from 'query-string';
import { Alert, Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Col } from 'reactstrap'
import { Control, Errors, actions, Form } from 'react-redux-form'
import { required, maxLength, minLength, validEmail } from '../validation-form';
import { connect } from 'react-redux';
import { fetchUsers } from '..//../redux/Actions/UserActions';
import { Loading } from '../Loading'

const mapDispatchToProps = dispatch => ({
    fetchUsers: (query) => dispatch(fetchUsers(query)),
    resetUserForm: () => dispatch(actions.reset('userForm'))
})
const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const UserManager = (props) => {


    //#region  Orthers

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [userResponse, setUserResponse] = useState(); //Use for reload data when delete or update user/admin
    const [alertMess, setAlertMess] = useState()

    // Để xác định xem đang xem tab user hay tab admin
    const [isUserShow, setIsUserShow] = useState(true)

    function handleAlertMess(alert) {
        setAlertMess(alert);
    }
    //#endregion Orthers

    //#region Search User Handle
    const [searchString, setSearchString] = useState();
    function handleSearching(value) {
        setSearchString({ ...value, isAdmin: !isUserShow })
    }
    //#endregion Search User Handle

    //#region fetch user
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [usersData, setUsersData] = useState([]);

    // ----------
    const [totalPagesAd, setTotalPagesAd] = useState(0);
    const [adminsData, setAdminsData] = useState([]);

    function handlePageChange(nextPage) {
        setPage(nextPage)
    }

    // const { users, admins } = props.users.users;
    // console.log(props.users.users[0]);
    useEffect(() => {
        const paramsString = querystring.stringify(searchString)
        // async function fetchUserSearch() {
        //     await axios.get(baseURL + `users/?page=${page}&${paramsString}`, { withCredentials: true })
        //         .then(response => response.data)
        //         .then(data => {
        //             setIsAuthenticated(data[2].isAuthenticated);
        //             setAdminsData(data[1] ? data[1].admins : []);
        //             setUsersData(data[0] ? data[0].users : []);
        //             setPage(page)

        //             setTotalPages(
        //                 data[0] ? data[0].totalPages : 1
        //             )
        //             setTotalPagesAd(
        //                 data[1] ? data[1].totalPages : 1
        //             )
        //         })
        // }
        //fetchUserSearch();





        const query = { page: page, paramsString: paramsString };
        props.fetchUsers(query);

        if (!props.users.isLoading) {
            const data = props.users.users;
            setAdminsData(data[1] ? data[1].admins : []);
            setUsersData(data[0] ? data[0].users : []);
            setPage(page)

            setTotalPages(
                data[0] ? data[0].totalPages : 1
            )
            setTotalPagesAd(
                data[1] ? data[1].totalPages : 1
            )
        }






        //fetchUserSearch();

    }, [page, searchString, userResponse])
    //#endregion fetch user

    //#region Delete User Handle

    const [userDeleteId, setUserDeleteId] = useState();

    function handleDeleteUser(userId) {

        setUserDeleteId(userId)
    }
    useEffect(() => {
        if (userDeleteId && isUserShow) {
            async function deleteUser() {
                try {
                    return await axios.delete(baseURL + `users/?userDeleteId=${userDeleteId}`)
                        .then(response => response.data)
                        .then(data => {
                            //console.log(data);
                            setUsersData(data.users);
                            setPage(1)
                            setTotalPages(data.totalPages);

                            setAlertMess({
                                success: true,
                                message: 'Xóa user thành công!'
                            })
                        })

                } catch (error) {
                    setUsersData(error.response.data.users);
                    setPage(page)
                    setTotalPages(error.response.data.totalPages);
                    setAlertMess({
                        success: false,
                        message: 'Xóa user thất bại!'
                    })
                }

            }
            deleteUser();

        }

        const myAlertMess = setTimeout(() => {
            setAlertMess()
        }, 5000)

        return () => {
            clearTimeout(myAlertMess)

        }



    }, [userDeleteId])

    //#endregion Delete User Handle

    //#region Create & Update
    const [isCreateUpdateOpen, setIsCreateUpdateOpen] = useState(false);
    const toggleCreateUpdate = () => { setIsCreateUpdateOpen(!isCreateUpdateOpen) }

    const [validationObject, setValidationObject] = useState({});

    const [userUpdate, setUserUpdate] = useState();
    const [userUpdateSubmit, setUserUpdateSubmit] = useState();
    const [userCreate, setUserCreate] = useState();


    function handleButtonUpdate(user) {
        //console.log(user);
        setUserUpdate(user);
        toggleCreateUpdate();
    }

    function handleSubmitCreateUpdate(values) {
        if (userUpdate) {
            setUserUpdateSubmit({ ...userUpdate, name: values.name, email: values.email, phone: values.phone, isAdmin: isUserShow ? values.isAdmin : true });
            toggleCreateUpdate(); //Close Modal 
        } else {
            setUserCreate({ ...values, historyChecks: [] })
            toggleCreateUpdate();
        }
    }

    useEffect(() => {
        async function updateCreateUser() {
            try {
                if (!userUpdate && userCreate) {
                    await axios.post(baseURL + 'users', userCreate)
                        .then(response => response.data)
                        .then(data => {
                            setAlertMess({
                                success: true,
                                message: data.alertMess
                            })

                            return setUserResponse(data.newAdmin)
                        })

                } else if (userUpdate && !userCreate) {
                    //Check if user update
                    await axios.put(baseURL + 'users', userUpdateSubmit)
                        .then(response => response.data)
                        .then(data => {
                            setAlertMess({
                                success: true,
                                message: data.alertMess
                            })

                            if (isUserShow) {
                                return setUserResponse(data.newUser)
                            } else {
                                return setUserResponse(data.newAdmin)
                            }

                        })
                }
            } catch (error) {
                setAlertMess({
                    success: false,
                    message: error.response.data.alertMess
                })
            }
        }
        updateCreateUser();

        const myAlertMess = setTimeout(() => {
            setAlertMess()
        }, 5000)

        return () => {
            clearTimeout(myAlertMess)

        }

    }, [userCreate, userUpdateSubmit])

    //#endregion Create & Update

    if (props.users.isLoading) {
        return (
            <Loading />
        )
    } else {
        console.log(usersData);
        return (
            <>
                {/* Alert Message */}
                <div className='container mt-5'>
                    {alertMess ? <Alert color={alertMess.success ? 'success' : 'danger'} >{alertMess.message}</Alert> : null}
                </div>

                {/* Tab user/admin */}
                <div className='container mt-5'>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a
                                className={isUserShow ? 'nav-link btn active' : 'nav-link btn'}
                                onClick={() => { setIsUserShow(true); setPage(1) }}
                                aria-current="page">
                                User
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={!isUserShow ? 'nav-link btn active' : 'nav-link btn'}
                                onClick={() => { setIsUserShow(false); setPage(1) }}
                            >
                                Admin
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Elements */}
                <div className='container mt-5'>
                    {/* Search box */}
                    <Search isAdmin={!isUserShow} onSearchChange={handleSearching} />

                    {/* Button Create New */}
                    <div className='row my-5'>
                        <div>
                            <Button onClick={toggleCreateUpdate} color='primary' type='button'>
                                Tạo mới
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div>
                        {
                            isUserShow ? <UserList handleButtonUpdate={handleButtonUpdate} isUser={isUserShow} onChangeAlert={handleAlertMess} users={usersData} onDeleteUser={handleDeleteUser} />
                                : <UserList handleButtonUpdate={handleButtonUpdate} isUser={isUserShow} onChangeAlert={handleAlertMess} users={adminsData} />
                        }
                    </div>

                    {/* Modal create & update user */}
                    <Modal size='lg' isOpen={isCreateUpdateOpen}>
                        <ModalHeader toggle={() => { toggleCreateUpdate(); props.resetUserForm() }}>{userUpdate ? 'CẬP NHẬT' : 'TẠO MỚI'}</ModalHeader>
                        <ModalBody>
                            <Form model='userForm' onSubmit={(values) => handleSubmitCreateUpdate(values)}>
                                {/* name */}
                                <FormGroup row>
                                    <Label sm={2} for='name'><b>Tên</b></Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.name'
                                            id='name'
                                            type='text'
                                            className='form-control'
                                            placeholder='Nhập họ tên...'
                                            defaultValue={userUpdate ? userUpdate.name : null}
                                            onFocus={() => setValidationObject({
                                                required,
                                                minLength: minLength(5),
                                                maxLength: maxLength(15)
                                            })}
                                            validators={validationObject}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                minLength: 'Tối thiểu 5 ký tự',
                                                maxLength: 'Tối đa 15 ký tự'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Email */}
                                <FormGroup row>
                                    <Label sm={2} for='email'><b>Email</b></Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.email'
                                            id='email'
                                            type='email'
                                            className='form-control'
                                            placeholder='Nhập email...'
                                            defaultValue={userUpdate ? userUpdate.email : null}
                                            onFocus={() => setValidationObject({
                                                required,
                                                validEmail
                                            })}
                                            validators={validationObject}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                validEmail: 'Email không hợp lệ'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Username */}
                                <FormGroup row>
                                    <Label sm={2} for='username'><b>Username</b></Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.username'
                                            id='username'
                                            disabled={userUpdate ? true : false}
                                            type='text'
                                            className='form-control'
                                            placeholder='Nhập username...'
                                            defaultValue={userUpdate ? userUpdate.username : null}
                                            onFocus={() => setValidationObject({
                                                required,
                                                minLength: minLength(5),
                                                maxLength: maxLength(15)
                                            })}
                                            validators={validationObject}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".username"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                minLength: 'Tối thiểu 5 ký tự',
                                                maxLength: 'Tối đa 15 ký tự'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Password */}
                                <FormGroup row>
                                    <Label sm={2} for='password'><b>Password</b></Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.password'
                                            id='password'
                                            //disabled={userUpdate ? true : false}
                                            type='password'
                                            className='form-control'
                                            placeholder='Nhập password...'
                                            defaultValue={userUpdate ? userUpdate.password : null}
                                            onFocus={() => setValidationObject({
                                                required,
                                                minLength: minLength(5),
                                                maxLength: maxLength(15)
                                            })}
                                            validators={validationObject}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".password"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                minLength: 'Tối thiểu 5 ký tự',
                                                maxLength: 'Tối đa 15 ký tự'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Phone */}
                                <FormGroup row>
                                    <Label sm={2} for='phone'><b>Số điện thoại</b></Label>
                                    <Col sm={9}>
                                        <Control.text
                                            model='.phone'
                                            id='phone'
                                            type='number'
                                            className='form-control'
                                            placeholder='Nhập số điện thoại...'
                                            defaultValue={userUpdate ? userUpdate.phone : null}
                                            onFocus={() => setValidationObject({
                                                required,
                                                minLength: minLength(9),
                                                maxLength: maxLength(11)
                                            })}
                                            validators={validationObject}
                                        />
                                        <Errors
                                            className="errors"
                                            model=".phone"
                                            show="touched"
                                            messages={{
                                                required: 'Không được để trống!',
                                                minLength: 'Tối thiểu 9 ký tự',
                                                maxLength: 'Tối đa 11 ký tự'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                {/* Admin checkbox */}
                                <FormGroup row hidden={!isUserShow}>
                                    <Label sm={2}></Label>
                                    <Col sm={9}>
                                        <label><Control.checkbox model=".isAdmin" defaultValue={false} />{' '}  isAdmin</label>
                                    </Col>
                                </FormGroup>

                                {/* Button */}
                                <>
                                    <Button hidden={userUpdate} color='primary' type='submit'>Tạo mới</Button>
                                    {' '}
                                    <Button hidden={!userUpdate} color='primary' type='submit'>Cập nhật</Button>
                                    {' '}
                                    <Button onClick={() => { props.resetUserForm() }} >Reset</Button>
                                    {' '}
                                    <Button onClick={() => { toggleCreateUpdate(); setUserUpdate(); props.resetUserForm() }} >Hủy</Button>
                                </>
                            </Form>
                        </ModalBody>
                    </Modal>

                    {/* Pagination */}
                    <Pagination page={page} totalPages={isUserShow ? totalPages : totalPagesAd} onPageChange={handlePageChange} />
                </div>

            </>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)