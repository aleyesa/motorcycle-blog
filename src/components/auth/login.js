import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { validateLogin, authentication } from "../api/editor";
import Main from "../main";


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

        <div>
            <form onSubmit={e => {
                // e.preventDefault();
                this.login(e);
                }
                }>
                <input
                    type="text"
                    onChange={e => this.setState({ username: e.target.value})}
                />
                <input 
                    type="text"
                    onChange={e => this.setState({ password: e.target.value})}
                />
                <button type="submit">login</button>

            </form>

            <a href="/register">Create Editor Account</a>
            
            {this.state.redirect === true && 
            <Redirect
                to={{
                    pathname: "/",
                    state: { test: "cookies" }
                }}
            />
            }
            
            
         
        </div>
        
        );

    }
    
        
}
