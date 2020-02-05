
import React from "react";
import { connect } from "react-redux";

import Card from "./Card";
import { getAllBoards, getLists, } from '../../actions/actionTest';


const mapStateToProps = state => {
  return { boards: state.boards, lists: state.lists };
};

const mapDispatchToProps = dispatch => {
    return {
        getLists: (boardId) => dispatch(getLists(boardId)),
        getAllBoards: () => dispatch(getAllBoards())
    };
  };


class Cards extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        listId: this.props.listId
    };
}

componentDidMount() {
      this.props.getLists(this.props.boardId)
      this.props.getAllBoards()
  }

displayCards(){
  return (this.props.boards.map(board => {
    // eslint-disable-next-line array-callback-return
    return(board.lists.map(list => {
      if(list._id === this.props._id){
        return (list.cards.map((card, index) => {
          return (
            <Card cardTitle={card.cardtitle} key={index} cardId={card._id} />
          );
        }));
        
      }
    }));
  }));
  }



  render(){
    return(
      <div>
        {this.displayCards()}
      </div>
    );
  
};

}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);