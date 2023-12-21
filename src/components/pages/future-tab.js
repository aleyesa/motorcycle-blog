import React, { Component } from "react";

import default_future_img_1 from "../../../static/assets/images/default-images/yamahaR1.jpg"

export default class FutureTab extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="default_wrapper">
                    <div className="content-wrapper">
                        <figure key="default_present_img_1" accessKey="default_present_img_1">
                                <img className="tab_img" src={default_future_img_1}></img>
                                <figcaption>Yamaha R1 Photo by <a href="https://unsplash.com/@zacwolff?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Zac Wolff</a> on <a href="https://unsplash.com/photos/orange-and-black-sports-bike-on-road-during-daytime-Ptx8G07I6xI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                                </figcaption>
                        </figure>
                        <div key="default_present_content" accessKey="default_present_content">
                        <h1>My Dream Bike</h1>
                            <p>If i were to ever upgrade to a liter bike, I would say that the Yamaha R1 is the one that I will get.</p>
                        </div>
                    </div>
                </div> 
            </div>

        )
    }
}

