import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions-helper';

import { fetchCategories } from '../action/cookbook';

const getInitialState = () => ({
    categories: [],
});

const categories = handleActions({
    [fetchCategories.success]: (state, action) => action.payload,
}, getInitialState().categories);

export default combineReducers({
    categories,
});
