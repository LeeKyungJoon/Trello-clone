import React, { Component } from "react";
import AddList from "./AddList";
import Lists from "./Lists";
import { connect } from "react-redux";
import { getAllUsers } from '../../actions/actionTest';




const mapStateToProps = state => {
  return { boards: state.boards };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers())
    };
  };


class BoardView extends Component {

    componentDidMount() {
        this.props.getAllUsers()
    }
    
    render() {
        return (
          <div>
          {this.props.boards.map((board, index )=> {
            // eslint-disable-next-line array-callback-return
            if(board._id === this.props.match.params.boardId) {
              // eslint-disable-next-line array-callback-return
              return <div key={index}>
                        <div>
                              <h2>
                                {board.boardtitle}
                              </h2>
                              <div>
                                <AddList boardId={board._id} {...this.props} lists={board.lists} />
                              </div>
                        </div>
                        <Lists boardId={board._id} lists={board.lists}/>
                      </div>
            } 
          })
            
            }
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);