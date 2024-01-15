import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getEditor, changePassword, deleteEditorAccount } from "../api/editor";

export default class Profile extends Component {
    constructor(props) {

        super(props);

        this.state = {
            editor_info: 
            {
                username: "",
                password: ""
            },
            new_password: ""
        }

        this.getEditorInfo = this.getEditorInfo.bind(this);
    }

    componentDidMount() {
        this.getEditorInfo();
    }
    componentDidUpdate() {
        this.state.editor_info;
    }

    getEditorInfo= () => {
        getEditor(sessionStorage.getItem("editor_id"), sessionStorage.getItem("jwt"))
        .then(response => {
            this.setState({ 
                editor_info: 
                {

                    username: response.data.username,
                    password: response.data.password

                }
                });
        })
        .catch(error => {
            console.log(error);
            return error;
        });
    }

    render() {
    return (

    <div className="profile-section">
        <a className="nav-home" href="/"><FontAwesomeIcon icon="fa-solid fa-angle-left" />Back to Home</a>

        <h2>Editor Info</h2>
            <div className="editor-info">
                <p>Username: {this.state.editor_info.username} </p>
                <p>Current Password: {this.state.editor_info.password} </p>
            </div>
            
            <form onSubmit={ e => changePassword(sessionStorage.getItem("editor_id"), this.state.new_password, sessionStorage.getItem("jwt"))}>
                <label>New Password:</label>
                <input 
                    type="text"
                    onChange={e => this.setState({ new_password: e.target.value})}
                />
                <button type="submit"  >Update Password</button>
            </form>

            <button type="button" onClick={e => deleteEditorAccount(sessionStorage.getItem("editor_id"), sessionStorage.getItem("jwt"))}>Delete Account</button>

    </div>
        
        );
    }
    
        
}

