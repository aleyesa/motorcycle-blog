import React, { Component } from "react";
import Tab from "./layout/tab";

export default class HomeTab extends Component {
    constructor(props) {

        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="home-section">
            <   Tab tab_name="home" tab_path="home" tab_name_id="home_id"/>
            </div>
        
        );




            // <div className="home-section">   
            //     <div key="home_content" accessKey="home_content">
            //         <h1>Hello this is my Motorcycle Blog!</h1>
            //         <p>This is a blog that shows my motorcycle progression to where I started, to where I currently am with motorcycle, and to what the future holds! I hope you enjoy the content shown!</p>
            //     </div>     
            // </div>
      
    }
}