import React, { Component } from "react";

import ContentLayout from "./layout/content-layout";

export default class PresentTab extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ContentLayout />
                <img className="present_tab_img" alt="XSR700_img_1" src={require("../../../static/assets/images/XSR700_img_1.jpg")} />
            </div>
        )
    }
}