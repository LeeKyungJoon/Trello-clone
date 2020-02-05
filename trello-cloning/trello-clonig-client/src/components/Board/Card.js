import React from "react";
import { connect } from "react-redux";
import { deleteCard, editCard } from '../../actions/actionTest';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const mapDispatchToProps = dispatch => {
    return {
        deleteCard: card => dispatch(deleteCard(card)),
        editCard: card => dispatch(editCard(card))
    };
};


class DeleteCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      editCardTitle: props.cardTitle
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

    onDragStart(event, id, title) {
        event.dataTransfer.setData("id", id);
        event.dataTransfer.setData("title", title);
        event.dataTransfer.setData("listId", this.props.listId);
    }

    handleClick() {
      console.log('여기 뭐야??', this.props)
        let id = this.props.cardId;
        this.props.deleteCard({ id });
    }

    handleChange(event) {
        this.setState({ editCardTitle: event.target.value });
    }

    openEditor = () => {
      this.setState({ openForm: true });
    }

    handleClickEdit(event) {
        event.preventDefault();
        const { editCardTitle } = this.state;
        const id = this.props.cardId;
        this.props.editCard({ cardTitle: editCardTitle, id});
        this.setState({ editCardTitle: this.props.cardTitle,
         openForm: false});
    }


    render() {
        return (
          <Card style={styles.cardContainer} draggable onDragStart={(e) => this.onDragStart(e, this.props.cardId, this.props.cardTitle)}>
            <CardContent style={{display: "flex", flexDirection: "row"}}>
              <Typography gutterBottom>
                {this.props.cardTitle}
              </Typography>
              <div>
                { this.state.openForm 
                ?  <form onSubmit={this.handleClickEdit}>
                    <div>
                      <input
                            style={{marginLeft: 15}}
                            autoComplete="off"
                            type="text"
                            id="boardtitle"
                            value={this.state.editCardTitle}
                            onChange={this.handleChange}
                        />
                    </div>
                  </form>
                : <Button style={{marginLeft: 15}} onClick={() => {this.openEditor();}}>
                    <Icon style={{ marginTop: -5, cursor: "pointer"}}>edit</Icon>
                </Button>
                }
               </div>
              <Button style={{marginLeft: 10}} onClick={() => { this.handleClick(); }} >
                <Icon style={{ marginTop: -5, cursor: "pointer"}}>close</Icon>
              </Button>
            </CardContent>
          </Card>
        );
    }
}

const styles = {
  cardContainer: {
    marginBottom: 8
  }
}

export default connect(null, mapDispatchToProps)(DeleteCard);