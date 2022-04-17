import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Province } from './Reducers/ProvinceReducer';
import { User } from './Reducers/UserReducer';
import thunk from 'redux-thunk';
import { createForms } from 'react-redux-form';
import { InitialNorthForm, InitialSouthCentralForm, InitialUserForm } from '../components/InitialForm';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            provinces: Province,
            users: User,
            ...createForms({
                northForm: InitialNorthForm,
                southCentralForm: InitialSouthCentralForm,
                userForm: InitialUserForm

            })
        }),
        applyMiddleware(thunk)
    )

    return store;
}