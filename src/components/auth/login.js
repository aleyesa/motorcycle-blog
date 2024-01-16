import React, { Component } from "react";
import { validateLogin, updateLoginStatus } from "../api/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false,
            hide: false,
            text: ""
        }

        this.login = this.login.bind(this);
    }

    login = (event) => {
        event.preventDefault();

        if(this.state.username !== "" & this.state.password !== ""){
            validateLogin(this.state.username, this.state.password)
            .then(response => {

                const authentication = {
                    editor_id: response.data.editor_id,
                    logged_in: response.data.logged_in,
                    jwt: response.data.jwt
                };
        
                if(response.data.invalid_credentials == true){
                    this.setState({
                        text: "Invalid Credentials",
                        hide: false
                });
                } else {
                 updateLoginStatus(authentication);
                 this.setState({
                    text: "Logged In Succesfully",
                    hide: true
                });
                }
        
                
            })
            .catch(error => {
                console.log(error);
                return error;
            });
            this.setState({redirect: true});
        } else {
            console.log("Need username and password");
        }


        

    }

    render() {
    return (
        this.state.hide === false ? (
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

            <p>{this.state.text}</p>

            <a className="nav-register" href="/register">Create Editor Account</a>
            
        </div>
        )
        :
        (
            <div className="login-section">

                <a className="nav-home" href="/"><FontAwesomeIcon icon="fa-solid fa-angle-left" />Back to Home</a>
                <p>{this.state.text}</p>

            </div>

        )
        
        
        );

    }
    
        
}
