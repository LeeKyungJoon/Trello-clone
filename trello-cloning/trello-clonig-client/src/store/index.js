import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers/index";
import thunk from "redux-thunk";
// localStorage.getItem("reduxState")
// localStorage.clear()
// const persistedState = localStorage.getItem("usertoken") ? JSON.parse(localStorage.getItem("usertoken")) : alert('해당 유저가 없습니다.');
// 주석 처리 되어있는 것들은 서버 없이 유지시키기 위한 것들
//console.log(localStorage.reduxState)
let store = createStore(
    reducer,
    applyMiddleware(thunk),
    // persistedState
);

// store.subscribe(() => {
//     localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });

// store.subscribe(() => {
//   localStorage.setItem("usertoken", JSON.stringify(store.getState().user));
// });


export default store;