import React, { Component } from "react";
import { connect } from "react-redux";

import AddBoard from "./AddBoard";
import Boards from "./Boards";
import { getAllUsers, getAllBoards } from '../../actions/actionTest';


const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        getAllBoards: () => dispatch(getAllBoards()),
    };
  };

class BoardList extends Component {

  componentDidMount() {
      this.props.getAllUsers()
      this.props.getAllBoards()
  }


  render() {
    return (
      <div>
        <div style={{display: "flex", flexDirection: "row",}}>
          <h1>Boards</h1>
        </div>
        <div style={styles.listsContainer}>
            <div style={{marginBottom: 5}}>
              <AddBoard />
            </div>
            <div>
              <Boards />
            </div>
        </div>
      </div>
    );
  }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "column",
  }
}

export default connect(null, mapDispatchToProps)(BoardList);