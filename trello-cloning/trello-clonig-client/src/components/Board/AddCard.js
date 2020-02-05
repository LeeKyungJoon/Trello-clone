import React from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addCard, getAllBoards, getLists } from '../../actions/actionTest';


const mapStateToProps = state => {
  return { boards: state.boards };
};


const mapDispatchToProps = dispatch => {
    return {
      getAllBoards: () => dispatch(getAllBoards()),
      addCard: card => dispatch(addCard(card)),
      getLists: (boardId) => dispatch(getLists(boardId))
    };
  };

class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            _id: this.props._id
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getAllBoards()
        this.props.getLists(this.props.boardId)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        const _id = this.props._id;
        const id = uuidv1();
        this.props.addCard({ title, _id ,id });
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                    placeholder="내용을 입력하세요."
                    autoComplete="off"
                    type="text"
                    id="title"
                    value={title}
                    onChange={this.handleChange}
                />
            </div>
          </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
