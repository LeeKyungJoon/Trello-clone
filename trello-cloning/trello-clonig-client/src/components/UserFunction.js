import axios from 'axios'
import {CONSTANTS} from '../actions';

export const register = newUser => {
    return axios
        .post('users/register', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            return res.data
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const editName = name => {
    return dispatch => { axios
        .put(`users/${name._id}/name`, {
            _id: name._id,
            name: name.name
        })
        .then(res => {
            return res.data
        })
        .then(json => {
            dispatch({
                type: CONSTANTS.EDIT_NAME, 
                payload: json
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const editPassword = password => {
    return dispatch => { axios
        .put(`users/${password._id}/password`, {
            _id: password._id,
            password: password.password
        })
        .then(res => {
            return res.data
        })
        .then(json => {
            dispatch({
                type: CONSTANTS.EDIT_PASSWORD, 
                payload: json
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export function deleteUser(deleteId) { 
  return dispatch => { axios
    .delete(`http://localhost:5000/users/${deleteId._id}/delete`, {
    })
    .then(res => {
      return res.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.DELETE_USER, 
        payload: json
      })
    })
    .catch(err => {
            console.log(err)
        })
  }
}
