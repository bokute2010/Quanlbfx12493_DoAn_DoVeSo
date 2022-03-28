import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Province } from './Reducers/ProvinceReducer';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            provinces: Province
        }),
        applyMiddleware(thunk)
    )

    return store;
}