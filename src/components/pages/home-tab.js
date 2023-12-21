import React, { Component } from "react";

export default class HomeTab extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div className="home_tab_wrapper">   
                <div key="home_content" accessKey="home_content">
                    <h1>Hello this is my Motorcycle Blog!</h1>
                    <p>This is a blog that shows my motorcycle progression to where I started, to where I currently am with motorcycle, and to what the future holds! I hope you enjoy the content shown!</p>
                </div>     
            </div>
        );
    }
}