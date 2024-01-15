import React, { Component } from "react";
import { createEditorAccount, validateLogin } from "../api/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Register extends Component {
    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: ""
        }   
    }

    render() {
    return (

        <div className="register-section">
            <a className="nav-home" href="/"><FontAwesomeIcon icon="fa-solid fa-angle-left" />Back to Home</a>

            <form onSubmit={e => {
                e.preventDefault();
                console.log(this.state.username);
                console.log(this.state.password);
                createEditorAccount(this.state.username, this.state.password);
                this.props.history.push("/");
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
        </div>
        
        );
    }
    
        
}
