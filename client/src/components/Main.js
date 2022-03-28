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

import { fetchProvinces, createLottery } from '../redux/Actions/LotteryActions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        provinces: state.provinces
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProvinces: () => { dispatch(fetchProvinces()) },
    createLottery: (lottery) => dispatch(createLottery(lottery))
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
                    <Route exact path='/login' element={<Login />} />
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
                                n
                            />}
                    />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);