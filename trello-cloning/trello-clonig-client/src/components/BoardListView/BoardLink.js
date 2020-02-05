import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { deleteBoard, editBoard } from '../../actions/actionTest';

const mapDispatchToProps = dispatch => {
    return {
        deleteBoard: board => dispatch(deleteBoard(board)),
        editBoard: board => dispatch(editBoard(board)),
    };
  };

class BoardLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      editTitle: props.boardtitle
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

    handleClickDelete(e) {
        let id = this.props.id;
        this.props.deleteBoard({ id });
    }

    handleChange(event) {
        this.setState({ editTitle: event.target.value });
    }

    openEditor = () => {
      this.setState({ openForm: true });
    }

    handleClickEdit(event) {
        event.preventDefault();
        const { editTitle } = this.state;
        const { id } = this.props;
        this.props.editBoard({ boardtitle: editTitle, id});
        this.setState({ editTitle: this.props.boardtitle,
         openForm: false});
    }

    render() {
      return (
        <div style={styles.container}>
        <Link to={{ pathname: "/board/" + this.props.id }} style={{textDecorationLine: "none"}}>
        <Button>
          {this.props.boardtitle}
        </Button>
        </Link>
        <div>
        { this.state.openForm 
        ?  <form onSubmit={this.handleClickEdit}>
            <div>
              <input
                    autoComplete="off"
                    type="text"
                    id="boardtitle"
                    value={this.state.editTitle}
                    onChange={this.handleChange}
                />
            </div>
          </form>
        : <Button onClick={() => {this.openEditor();}}>
            <Icon>edit</Icon>
        </Button>
        }
        </div>
        <Button onClick={() => { this.handleClickDelete(); }} >
            <Icon style={{cursor: "pointer"}}>close</Icon>
        </Button>

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
        marginRight: 8,
        display: "flex",
        flexDirection: "row",
        marginBottom: 5
    }
}

  // export default BoardLink;
  export default connect(null, mapDispatchToProps)(BoardLink);