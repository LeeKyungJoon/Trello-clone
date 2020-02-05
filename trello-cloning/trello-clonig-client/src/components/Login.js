import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { CardHeader, CardContent, CardActions} from "@material-ui/core";
import { login } from './UserFunction'

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    };

    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }
    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
          email: this.state.email,
          password: this.state.password
        }

        login(user).then(res => {
            if(!res.error) {
                this.props.history.push(`/`)
            }else{
              alert('아이디 또는 비밀번호가 일치하지 않습니다.')
            }
        })
    }

    render() {
        return (
            <div>
                <Grid item xs={12} sm={6}>
                  <CardHeader title="로그인"/>
                  <CardContent>
                    <TextField
                      label="이메일을 입력하세요."
                      fullWidth
                      autoFocus
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
                    <Button onClick={this.onSubmit}
                    type="submit" color="primary">
                      로그인
                    </Button>

                  </CardActions>
            </Grid>
        </div>
    );
  }
}

