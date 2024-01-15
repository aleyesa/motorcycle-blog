import React, { Component } from "react";
import { validateLogin } from "../api/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false
        }

        this.login = this.login.bind(this);
    }

    login = (event) => {
        event.preventDefault();

        if(this.state.username !== "" & this.state.password !== ""){
            validateLogin(this.state.username, this.state.password);
            this.setState({redirect: true});
        } else {
            console.log("Need username and password");
        }


        

    }

    render() {
    return (

        <div className="login-section">
            <a className="nav-home" href="/"><FontAwesomeIcon icon="fa-solid fa-angle-left" />Back to Home</a>

            <form onSubmit={e => {
                this.login(e);
                }
                }>
                <label>Username
                <input
                    type="text"
                    onChange={e => this.setState({ username: e.target.value})}
                />
                </label>
                <label>Password
                <input 
                    type="password"
                    onChange={e => this.setState({ password: e.target.value})}
                />
                </label>
                <button type="submit">login</button>

            </form>

            <a className="nav-register" href="/register">Create Editor Account</a>
               
        </div>
        
        );

    }
    
        
}
