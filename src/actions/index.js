import http from "../services/api";

export const GET_USERS = 'GET_USERS';

export const getUsers = () => dispatch => {
    http.get('/incomplete')
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
        return error;
    }).then((results) => {
        dispatch({ type: GET_USERS, payload: results });
    });
};
