import React, { Component } from "react";

export default class MainLayoutContainer extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="header">
                    <h1>My Motorcycle Progression </h1>
                    <button>Login</button>
                </div>
                <div className="tabs-wrapper">
                    <div className="home-tab">
                        Home
                    </div>
                    <div className="past-tab">
                        Past
                    </div>
                    <div className="Present">
                        Present
                    </div>
                    <div className="future-tab">
                        Future
                    </div>
                </div>
                <div className="comment-icon">
                    <button className="comment-btn">
                        comment
                    </button>
                </div>
            </div>
        );
    }
}
