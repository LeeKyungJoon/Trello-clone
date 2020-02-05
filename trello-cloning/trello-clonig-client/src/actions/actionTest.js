import {CONSTANTS} from '../actions';
import axios from 'axios';
import jwt_decode from 'jwt-decode'


export function getAllUsers() {
  return dispatch => {
      axios.get(`http://localhost:5000/users`)
      .then(res => {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
          let users = res.data.data.find(user => 
              decoded.email === user.email
          )
        dispatch(getUsers(users))
      })
  };
}

export function getAllUsersNeed() {
  return dispatch => {
      axios.get(`http://localhost:5000/users`)
      .then(res => {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
          let users = res.data.data.find(user => 
              decoded.email === user.email
          )
        dispatch(getUsersNeed(users))
      })
  };
}

export function getAllBoards() {
  return dispatch => {
      axios.get(`http://localhost:5000/users`)
      .then(res => {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
          let users = res.data.data.find(user => 
              decoded.email === user.email
          )
        dispatch(getBoards(users))
      })
  };
}


export function getUsersNeed(userId) {
  return dispatch => {
      axios.get(`http://localhost:5000/users/${userId._id}`)
      .then(res => {
        dispatch({
            type: CONSTANTS.GET_ALL_USERS,
            payload: res.data
        })
      })
  };
}

export function getUsers(userId) {
  return dispatch => {
      axios.get(`http://localhost:5000/users/${userId._id}`)
      .then(res => {
        dispatch({
            type: CONSTANTS.GET_USERS,
            payload: res.data
        })
      })
  };
}

export function getBoards(userId) {
  return dispatch => {
      axios.get(`http://localhost:5000/users/${userId._id}`)
      .then(res => {
        dispatch({
            type: CONSTANTS.CREATE_BOARD,
            payload: res.data
        })
      })
  };
}

export function getLists(boardId) {
  return dispatch => {
      axios.get(`http://localhost:5000/boards/${boardId}/lists`)
      .then(res => {
        dispatch({
            type: CONSTANTS.GET_LISTS,
            payload: res.data
        })
      })
  };
}

export function addBoard( board ) { 
  return dispatch => {
    axios.post(`http://localhost:5000/users/${board.userId}/boards`, {
      boardtitle: board.boardtitle,
      userId: board.userId
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.ADD_BOARD, 
        payload: json
      })
    })
  }
}

export function addList( list ) { 
  return dispatch => {
    axios.post(`http://localhost:5000/boards/${list.boardId}/lists`, {
      listtitle: list.listtitle,
      boardId: list.boardId
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.ADD_LIST, 
        payload: json
      })
    })
  }
}

export function addCard( card ) { 
  return dispatch => {
    axios.post(`http://localhost:5000/lists/${card._id}/cards`, {
      cardtitle: card.title,
      listId: card._id
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.ADD_CARD, 
        payload: json
      })
    })
  }
}

export function deleteBoard( board ) { 
  return dispatch => {
    axios.delete(`http://localhost:5000/boards/${board.id}`, {
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.DELETE_BOARD, 
        payload: json
      })
    })
  }
}

export function deleteList( list ) { 
  return dispatch => {
    axios.delete(`http://localhost:5000/lists/${list._id}`, {
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.DELETE_LIST, 
        payload: json
      })
    })
  }
}

export function deleteCard( card ) { 
  console.log('뭐와??', card)
  return dispatch => {
    axios.delete(`http://localhost:5000/cards/${card.id}/card`, {
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.DELETE_CARD, 
        payload: json
      })
    })
  }
}

export function editBoard( board ) { 
  return dispatch => {
    axios.put(`http://localhost:5000/boards/${board.id}`, {
        boardtitle: board.boardtitle
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.EDIT_BOARD, 
        payload: json
      })
    })
  }
}

export function editList( list ) { 
  return dispatch => {
    axios.put(`http://localhost:5000/lists/${list.id}`, {
        listtitle: list.title
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.EDIT_LIST, 
        payload: json
      })
    })
  }
}

export function editCard( card ) { 
  return dispatch => {
    axios.put(`http://localhost:5000/cards/${card.id}`, {
        cardtitle: card.cardTitle
    })
    .then(res => {
      return res.data.data;
    })
    .then(json => {
      dispatch({
        type: CONSTANTS.EDIT_CARD, 
        payload: json
      })
    })
  }
}

