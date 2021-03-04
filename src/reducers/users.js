import {
    GET_USERS,
} from "../actions";
// import List from './list';

const initialState = {
    users: [ ],
};

export default function users(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return { ...state, todos: action.payload };
        default:
            return state;
    }
};
