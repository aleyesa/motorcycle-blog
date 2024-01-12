import React, { Component } from "react";
import { createEditorAccount, validateLogin } from "../api/editor";

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

        <div>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(this.state.username);
                console.log(this.state.password);
                createEditorAccount(this.state.username, this.state.password);
                this.props.history.push("/");
                }}>
                <input
                    type="text"
                    onChange={e => this.setState({ username: e.target.value})}
                />
                <input 
                    type="text"
                    onChange={e => this.setState({ password: e.target.value})}
                />
                <button type="submit"  >Create</button>
            </form>
        </div>
        
        );
    }
    
        
}
