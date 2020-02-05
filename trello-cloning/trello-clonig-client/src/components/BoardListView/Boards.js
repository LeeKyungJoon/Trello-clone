import React from "react";
import { connect } from "react-redux";

import BoardLink from "./BoardLink";

const mapStateToProps = state => {
  return { boards: state.boards };
};

const Boards = ({ boards }) => (
  <div style={styles.listsContainer}>
    {boards.map((board, index) => (
        <div key={index}>
          <BoardLink id={board._id} boardtitle={board.boardtitle}/>
        </div>
      ))
    }
  </div>
);

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "column",
  }
}


export default connect(mapStateToProps)(Boards);