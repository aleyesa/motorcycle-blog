import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import ContentLayout from "./layout/content-layout";

export default class PresentTab extends Component {
    constructor() {
        super();
    }

    // getImages = (e) => {
    //     const JAWSDB_URL = 'mysql://vgyb1e6tc22029gj:pkl6mmas5wvd31m9@lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/geei9sek17g9jznr';

    //     axios.get(`/`, {})
    //     .then((data) => {
    //         console.data(data);
    //     });
    // } 

    render() {

        return (
            <div>
                <ContentLayout />
                {/* {this.getImages()} */}
                <img className="present_tab_img" alt="XSR700_img_1" src={require("../../../static/assets/images/XSR700_img_1.jpg")} />
            </div>
        )
    }
}