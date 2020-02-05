import React from "react";
import { connect } from "react-redux";
import List from "./List";
import { getLists, getAllBoards } from '../../actions/actionTest';

const mapStateToProps = state => {
    return { boards: state.boards };
};

const mapDispatchToProps = dispatch => {
    return {
        getLists: (boardId) => dispatch(getLists(boardId)),
        getAllBoards: () => dispatch(getAllBoards())
    };
  };


class Lists extends React.Component{

  componentDidMount() {
      this.props.getLists(this.props.boardId)
      this.props.getAllBoards()
  }

  displayLists(){
   // eslint-disable-next-line array-callback-return
    return (
      <div style={styles.listsContainer} >

      {this.props.boards.map((board) => {
        if(board._id === this.props.boardId) {
          return(
            board.lists.map((list, index) => {
              return (
                <List title={list.listtitle} _id={list._id} boardId={this.props.boardId} key={index}/>
              );
            })
          );
        }
        return null;
      })}
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.displayLists()}
      </div>
    );
  }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);