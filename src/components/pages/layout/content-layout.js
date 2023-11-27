import React, { Component } from "react";

export default class ContentLayout extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="images-wrapper">
                    {/* <img className="focused-image">Focused Image Here</img> */}
                        Focused Image here
                    <div className="image-selector">
                        Images here
                        {/* <img>image 1</img>
                        <img>image 2</img> */}
                    </div>
                </div>

            </div>
        );
    }
} 