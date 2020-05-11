import { combineReducers } from 'redux';

const initialState = {
    setting: {
        userInfo: false,
    },
}

const setting = (state, action) => {
    switch (action.type) {
        case 'GetSetting': return {
            ...action.payload
        };
        case 'Authorized': return {
            ...state,
            userInfo: true,
        };
        default:
            return initialState.setting;
    }
}

export default combineReducers({
    setting,
});
