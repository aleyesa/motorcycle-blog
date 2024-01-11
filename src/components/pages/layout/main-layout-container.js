import React, { Component } from "react";
import { updateLoginStatus } from "../../api/editor";
import CommentSection from "./comment-section";
export default class MainLayoutContainer extends Component {

    constructor(props) {

        super(props);

    }

authentication = {

        editor_id: "" || sessionStorage.getItem("editor_id"),
        logged_in: 0 || sessionStorage.getItem("logged_in"),
        jwt: "" || sessionStorage.getItem("jwt")

}

    render() {

        return (

            <div className="main-wrapper">
                <div className="header">
                {sessionStorage.length === 0 || sessionStorage.getItem("logged_in") == 0 ?
                    <a className="login" href="/auth">Login</a>
                : 
                    <div>
                        <button type="button" onClick={ e => updateLoginStatus(this.authentication)}>Logout</button>
                        <a href="/profile">Profile</a>
                    </div>
                }
                <h1>My Motorcycle Progression </h1>

                </div>
                <div className="tabs-wrapper">
                    <div className="home-tab">
                    <a href="/">Home</a>
                    </div>
                    <div className="past-tab">
                    <a href="/past">Past</a>
                    </div>
                    <div className="Present">
                        <a href="/present">Present</a>
                    </div>
                    <div className="future-tab">
                    <a href="/future">Future</a>
                    </div>
                </div>
                <div className="comment-icon">
                    <button className="comment-btn">
                        comment
                    </button>
                    <CommentSection />
                </div>
            </div>
        );
    }
}
