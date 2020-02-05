import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import BoardList from "./components/BoardListView/BoardList";
import BoardView from "./components/Board/BoardView";

import Landing from './components/Landing';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from './components/Navbar';
import Profile from './components/Profile';


class App extends Component {
  render() {
    return (
      <div>
      <Navbar/>
      <div>
        
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={SignUp}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/board' component={BoardList}/>
            <Route exact path='/board/:boardId' component={BoardView} />
        </Switch>
      </div>
      </div>
    );
  }
}

// const styles = {
//   container: {
//     width: "1300px",
//     height: "200px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   }
// }

export default App;