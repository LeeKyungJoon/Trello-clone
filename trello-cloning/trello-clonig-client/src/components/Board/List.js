import React, { Component } from 'react';
import { connect } from "react-redux";
import AddCard from "./AddCard";
import Cards from "./Cards";
import { addCard, deleteCard, deleteList, editList, getAllBoards, getLists } from '../../actions/actionTest';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = dispatch => {
    return {
      deleteCard: (card) => dispatch(deleteCard(card)),
      addCard: (card) => dispatch(addCard(card)),
      deleteList: (list) => dispatch(deleteList(list)),
      editList: (list) => dispatch(editList(list)),
      getAllBoards: () => dispatch(getAllBoards()),
      getLists: (boardId) => dispatch(getLists(boardId))
    };
};

const mapStateToProps = state => {
  return { boards: state.boards };
};


class List extends Component{

  componentDidMount() {
        this.props.getAllBoards()
        this.props.getLists(this.props.boardId)
    }

  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      editListTitle: props.title
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

    onDragOver(event){
        event.preventDefault();
    }

    onDrop(event){
        let id = event.dataTransfer.getData("id");
        let title = event.dataTransfer.getData("title");
        const listId = this.props.listId;
        this.props.deleteCard({id});
        this.props.addCard({title, listId , id}); 
    }

    handleClick(){
        let _id = this.props._id;
        this.props.deleteList({_id});
    }

    handleChange(event) {
        this.setState({ editListTitle: event.target.value });
    }

    openEditor = () => {
      this.setState({ openForm: true });
    }

    handleClickEdit(event) {
        event.preventDefault();
        const { editListTitle } = this.state;
        const id = this.props._id;
        this.props.editList({ title: editListTitle, id});
        this.setState({ editListTitle: this.props.title,
         openForm: false});
    }

    render(){
        return(
          <div style={styles.container} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, "wip");}}>
            <div style={{display: "flex", flexDirection: "row"}}>
              <h4>
                {this.props.title}
              </h4> 
                  <div>
                    { this.state.openForm 
                    ?  <form onSubmit={this.handleClickEdit}>
                        <div>
                          <input
                                style={{marginLeft: 15, marginTop: 20}}
                                autoComplete="off"
                                type="text"
                                id="boardtitle"
                                value={this.state.editListTitle}
                                onChange={this.handleChange}
                            />
                        </div>
                      </form>
                    : <Button style={{marginLeft: 15}} onClick={() => {this.openEditor();}}>
                        <Icon style={{ marginTop: 12, cursor: "pointer"}}>edit</Icon>
                    </Button>
                    }
                  </div>  
                <div>
                <Button onClick= {() => {this.handleClick();}}>
                  <Icon style={{marginTop: 12, cursor: "pointer"}}>close</Icon>
                </Button>
                </div>
            </div>
            <Cards _id={this.props._id} {...this.props}/>
            <AddCard _id={this.props._id} {...this.props}/> 
          </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#dfe3e6',
        borderRadious: 3,
        width: 300,
        padding: 8,
        height: "100%",
        marginRight: 8
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(List);;