import React, { Component } from "react";
import { createEditorAccount, validateLogin } from "../api/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Register extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            hide: false,
            text: ""
        }   

    }

    render() {
    return (

        this.state.hide === false ? 
        (
            <div className="register-section">
                <a className="nav-home" href="/"><FontAwesomeIcon icon="fa-solid fa-angle-left" />Back to Home</a>

                <form onSubmit={e => {
                    e.preventDefault();
                    createEditorAccount(this.state.username, this.state.password)
                    .then(response => {

                        if(response.data.error === true) {
                            this.setState(
                                {
                                text: "Username already used.",
                                hide: false
                                }
                            );
                        
                        } else {
                            validateLogin(response.data.username, response.data.password);
                            this.setState(
                                {
                                text: "Account has been created.",
                                hide: true
                                }
                            );

                        }
                
                    })
                    .catch(error => {
                        console.log(error);
                        return error;
                    });
                
                    }}>
                    <label>Username
                        <input
                            type="text"
                            onChange={e => this.setState({ username: e.target.value})}
                        />
                        </label>
                        <label>Password
                        <input 
                            type="text"
                            onChange={e => this.setState({ password: e.target.value})}
                        />
                        </label>
                        <button type="submit">Create</button>

                    </form>

                    <p>{this.state.text}</p>
            </div>
        )
        :
        (
            <div className="register-section">
                <a className="nav-home" href="/"><FontAwesomeIcon icon="fa-solid fa-angle-left" />Back to Home</a>
                <p>{this.state.text}</p>
            </div>
        )
        
        );
    }
    
        
}
