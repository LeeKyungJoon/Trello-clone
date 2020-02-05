import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { editName, editPassword, deleteUser } from './UserFunction'
import { getAllUsersNeed } from '../actions/actionTest';


const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersNeed: () => dispatch(getAllUsersNeed()),
        editName: (name) => dispatch(editName(name)),
        editPassword: (password) => dispatch(editPassword(password)),
        deleteUser: (deleteId) => dispatch(deleteUser(deleteId))

    };
  };

class Profile extends Component {

        componentDidMount() {
            this.props.getAllUsersNeed()
        }


    constructor() {
        super()
        this.state = {
            openForm: false,
            password: '',
            editNaming: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.handleClickEdit = this.handleClickEdit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteSubmit = this.deleteSubmit.bind(this)
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    openEditor = () => {
      this.setState({ openForm: true });
    }
    handleChange(event) {
        this.setState({ editNaming: event.target.value });
    }

    handleClickEdit(event) {
        event.preventDefault();
        const name = {
            name: this.state.editNaming,
            _id: this.props.users._id
        }
        this.props.editName(name);
        this.setState({openForm: false});
    }

    onSubmit(e) {
        e.preventDefault()

        const password = {
            _id: this.props.users._id,
            password: this.state.password
        }
        this.props.editPassword(password)
        
    }

    deleteSubmit(e) {

        e.preventDefault()
        
        const deleteId = {
            _id: this.props.users._id,
        }
        this.props.deleteUser(deleteId)
            localStorage.removeItem('usertoken')
            this.props.history.push(`/`)
        
    }

    render() {
        return (
            <div>
                    <div>
                        <h1>Profile</h1>
                    </div>
                    <div style={{marginLeft: 5}}>
                        <div style={{marginBottom: 8, display: "flex", flexDirection: "row"}}>
                            이름: {this.props.users.name}
                            <div>
                                { this.state.openForm 
                                ?  <form onSubmit={this.handleClickEdit}>
                                    <div>
                                    <input
                                            autoComplete="off"
                                            type="text"
                                            value={this.state.editNaming}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </form>
                                : <Button 
                                    onClick={() => {this.openEditor();}}
                                    type="submit" color="primary" style={{marginTop: -9.5, marginLeft: 3}}>
                                        변경
                                  </Button>
                                }
                            </div>
                        </div>
                        <div style={{marginBottom: 15}}>이메일: {this.props.users.email}</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                        비밀번호 변경: <form>
                            <div>
                                <input
                                    placeholder="비밀번호를 입력하세요."
                                    autoComplete="off"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </div>
                        </form>
                        <Button 
                        onClick={this.onSubmit}
                        type="submit" 
                        color="primary" 
                        style={{marginTop: -8, marginLeft: 3}}>
                            변경
                        </Button>
                        </div>
                        <Button 
                        onClick={this.deleteSubmit}
                        type="submit" 
                        color="primary" 
                        style={{marginLeft: -8}}>
                            회원탈퇴
                        </Button>
                    </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);