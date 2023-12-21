import React, { Component } from "react";

import default_past_img_1 from "../../../static/assets/images/default-images/Suzuki_Burgman_400.jpg";
import default_past_img_2 from "../../../static/assets/images/default-images/kz400.jpg";
import default_past_img_3 from "../../../static/assets/images/default-images/cb550.jpg";
import default_past_img_4 from "../../../static/assets/images/default-images/cb900.jpg";



export default class PastTab extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="past_tab_wrapper">
                <div className="default_wrapper">
                    <div className="content-wrapper">
                        <figure key="default_past_img_1" accessKey="default_past_img_1">
                                <img className="tab_img" src={default_past_img_1}></img>
                                <figcaption>2005 Suzuki Burgman 400</figcaption>
                        </figure>
                        <div key="default_past_content" accessKey="default_past_content">
                        <h1>My First "Motorcycle"</h1>
                            <p>My first "Motorcycle" was a 2005 Suzuki Burgman 400! Some people say a motor scooter isn't considered a motorcycle, but it was 400cc's and capable of going 100mph. I definitely had some awesome memories with this bike!</p>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <figure key="default_past_img_2" accessKey="default_past_img_2">
                                <img className="tab_img" src={default_past_img_2}></img>
                                <figcaption>1984 Kawasaki KZ400</figcaption>
                        </figure>
                        <div key="default_past_content" accessKey="default_past_content">
                        <h1>The Next Bike</h1>
                            <p>My second bike was a 1984 Kawasaki kz400! It was given to me by my brother but it didnt have a title so it was just a short lived project that was only ridden once or twice before giving it away.</p>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <figure key="default_past_img_3" accessKey="default_past_img_3">
                                <img className="tab_img" src={default_past_img_3}></img>
                                <figcaption>1974 Honda 550</figcaption>
                        </figure>
                        <div key="default_past_content" accessKey="default_past_content">
                        <h1>The Bike That I Would Have Kept Forever</h1>
                            <p>Man oh man! I would say the most memorable motorcycle that I have ever owned was certainly this 1974 Honda CB550! I have rebuilt the top end, done all the maintenance, made it into a respectable cafe racer that turned heads! I would have kept it if I was finacially stable sadly.</p>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <figure key="default_past_img_4" accessKey="default_past_img_4">
                                <img className="tab_img" src={default_past_img_4}></img>
                                <figcaption>1980 Honda CB900</figcaption>
                        </figure>
                        <div key="default_past_content" accessKey="default_past_content">
                        <h1>The Bike that I Was Not Ready For</h1>
                            <p>I was searching through sites for a new project to work on and I found this 1980 Honda CB900! I fixed up to an extent and got it up and running. This bike was on a whole other level! The bike was way too heavy and put out too much unnecessary power to the point that I only rode it a few times before taking a loss and selling it.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}