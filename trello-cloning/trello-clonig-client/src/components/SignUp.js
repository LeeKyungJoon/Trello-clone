import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { CardHeader, CardContent, CardActions } from "@material-ui/core";
import { register } from './UserFunction';


export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name : '',
            password: '',
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    };
    onChangeName(e) {
        this.setState({name: e.target.value})
    }
    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }
    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }

        register(user)
        .then(res => {  
          if(!res.error){
              alert('환영합니다.')
              this.props.history.push(`/login`)
          }
          else {
            alert('이미 존재하는 이메일입니다.')
          }
        })
    }

  render() {

    return (
        <div>
            <Grid item xs={12} sm={6}>
                  <CardHeader title="회원가입"/>
                  <CardContent>
                    <TextField
                      label="이름을 입력하세요."
                      fullWidth
                      autoFocus
                      required
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                    <TextField
                      label="이메일을 입력하세요."
                      fullWidth
                      required
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                    <TextField
                      label="비밀번호를 입력하세요."
                      type="password"
                      fullWidth
                      required
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                    
                  </CardContent>
                  <CardActions style={{ justifyContent: "space-between" }}>
                    <Button onClick={this.onSubmit} color="primary">
                      가입완료
                    </Button>
                  </CardActions>
            </Grid>
        </div>
    );
  }
}

