import petsReducer from './petsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    pets: petsReducer
});