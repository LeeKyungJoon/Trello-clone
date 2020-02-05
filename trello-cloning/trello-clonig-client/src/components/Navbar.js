import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Button from "@material-ui/core/Button";

class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {
        const loginRegLink = (
            <div style={styles.listsContainer}>
                    <Link to="/login" style={{textDecorationLine: "none", color: "blue", fontSize: 20, marginLeft: 65}}>
                        로그인
                    </Link>
                    <Link to="/register" style={{marginLeft: 35, textDecorationLine: "none", color: "blue", fontSize: 20, marginTop: -1}}>
                        회원가입
                    </Link>
                
            </div>
        )

        const userLink = (
            <div style={styles.listsContainer}>
                    <Button>
                    <Link to="/board" style={{textDecorationLine: "none", color: "blue", fontSize: 20, marginTop: -8}}>
                        보드
                    </Link>
                    </Button>
                    <Button style={{marginTop: -10.5}}>
                    <Link to="/profile" style={{marginLeft: 35, textDecorationLine: "none", color: "blue", fontSize: 20}}>
                        내정보
                    </Link>
                    </Button>
                    <Button onClick={this.logOut.bind(this)} style={{marginLeft: 35, textDecorationLine: "none", color: "blue", fontSize: 20, marginTop: -12.5}}>
                        로그아웃
                    </Button>
            </div>
        )
    
        return (
            <div>
                <div>
                    <Link to="/" style={{textDecorationLine: "none", color: "black", fontSize: 70, marginLeft: 22}}>
                        KANBAN
                    </Link>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </div>
        )
    }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 5
  }
}

export default withRouter(Navbar)


