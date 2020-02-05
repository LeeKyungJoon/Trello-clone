import React from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addBoard, getAllBoards } from '../../actions/actionTest';


const mapStateToProps = state => {
    return { boards: state.oldboards };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBoards: () => dispatch(getAllBoards()),
        addBoard: board => dispatch(addBoard(board))
    };
};

class ConnectedNewBoardInput extends React.Component{
    constructor() {
        super();
        this.state = {
            boardtitle: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    this.props.getAllBoards();
  }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { boardtitle } = this.state;
        const userId = this.props.boards._id;
        const id = uuidv1();
        this.props.addBoard({ boardtitle, id, userId } );
        this.setState({ boardtitle: "" });
    }

    render(){
        const { boardtitle } = this.state;
        return(
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                    placeholder="보드 제목을 입력하세요."
                    autoComplete="off"
                    type="text"
                    id="boardtitle"
                    value={boardtitle}
                    onChange={this.handleChange}
                />
            </div>
          </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedNewBoardInput);