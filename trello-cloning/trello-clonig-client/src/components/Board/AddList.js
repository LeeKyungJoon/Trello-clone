import React from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addList, getAllUsers } from '../../actions/actionTest';


const mapStateToProps = state => {
  return { boards: state.boards };
};


const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        addList: list => dispatch(addList(list))
    };
};


class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listtitle: "",
            boardId: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount() {
        this.props.getAllUsers()
    }

    componentDidUpdate(nextProps){
        if (this.state.boardId !== nextProps.boardId) {
            this.setState({boardId : nextProps.boardId});
        }
    }



    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        
        event.preventDefault();
        const { listtitle } = this.state;
        const _id = uuidv1();
        const boardId = this.state.boardId;
        this.props.addList({ listtitle, _id, boardId });
        this.setState({ listtitle: "" });
    }


    render() {
        const { listtitle } = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
            <div style={{marginBottom: 5}}>
              <input
                    placeholder="리스트 제목을 입력하세요."
                    autoComplete="off"
                    type="text"
                    id="listtitle"
                    value={listtitle}
                    onChange={this.handleChange}
                />
            </div>
          </form>
        
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddList);
