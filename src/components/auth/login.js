import React, { Component } from "react";

import { validateLogin, authentication } from "../api/editor";

export default class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.login = this.login.bind(this);
        
    }

    login = (event) => {
        event.preventDefault();

        if(this.state.username !== "" & this.state.password !== ""){
            validateLogin(this.state.username, this.state.password);
            this.props.history.push("/");
        } else {
            console.log("Need username and password");
        }

    }

    render() {
    return (

        <div>
            <form onSubmit={this.login}>
                <input
                    type="text"
                    onChange={e => this.setState({ username: e.target.value})}
                />
                <input 
                    type="text"
                    onChange={e => this.setState({ password: e.target.value})}
                />
                <button type="submit"  >login</button>
            </form>

            <a href="/register">Create Editor Account</a>
         
        </div>
        
        );
    }
    
        
}
