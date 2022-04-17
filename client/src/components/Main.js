import React, { Component } from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import LotteryNorth from './LotteryShow/North/LotteryNorth';
import LotteryCentral from './LotteryShow/Central/LotteryCentral';
import LotterySouth from './LotteryShow/South/LotterySouth';
import PageNotFound from './PageNotFound';
import SearchLottery from './SearchLottery/SearchLottery';
import LotteryManager from './LotteryManager/LotteryManager';
import UserManager from './UserManager/UserManager';
import { actions } from 'react-redux-form';

import { fetchProvinces, createLottery, deleteLottery, deleteMultiLottery, updateLottery } from '../redux/Actions/LotteryActions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        provinces: state.provinces
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProvinces: () => { dispatch(fetchProvinces()) },
    createLottery: (lottery) => dispatch(createLottery(lottery)),
    deleteLottery: (provinceId, lotteryId) => dispatch(deleteLottery(provinceId, lotteryId)),
    deleteMultiLottery: (data) => dispatch(deleteMultiLottery(data)),
    updateLottery: (provinceId, lottery) => dispatch(updateLottery(provinceId, lottery)),
    resetNorthForm: () => dispatch(actions.reset('northForm')),
    resetSouthCentralForm: () => dispatch(actions.reset('southCentralForm'))

})

class Main extends Component {
    componentDidMount() {
        this.props.fetchProvinces();
    }

    render() {
        return (
            <>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/login' element={<Login isAdmin={false} />} />
                    <Route exact path='/login/admin' element={<Login isAdmin={true} />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/region/north' element={<LotteryNorth />} />
                    <Route exact path='/region/central' element={<LotteryCentral />} />
                    <Route exact path='/region/south' element={<LotterySouth />} />
                    <Route exact path='/search-lottery' element={<SearchLottery />} />
                    <Route exact path='/lottery-manager'
                        element={
                            <LotteryManager
                                provinces={this.props.provinces.provinces}
                                createLottery={this.props.createLottery}
                                deleteLottery={this.props.deleteLottery}
                                updateLottery={this.props.updateLottery}
                                deleteMultiLottery={this.props.deleteMultiLottery}
                                isLoading={this.props.provinces.isLoading}
                                errMess={this.props.provinces.errMess}
                                resetNorthForm={this.props.resetNorthForm}
                                resetSouthCentralForm={this.props.resetSouthCentralForm}
                            />}
                    />
                    <Route exact path='/admin/user-manager' element={<UserManager />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);