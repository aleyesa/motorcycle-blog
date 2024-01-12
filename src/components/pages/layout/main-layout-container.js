import React, { Component } from "react";
import { updateLoginStatus } from "../../api/editor";
import CommentSection from "./comment-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeTab from "../home-tab";
import PastTab from "../past-tab";
import PresentTab from "../present-tab";
import FutureTab from "../future-tab";


export default class MainLayoutContainer extends Component {

    constructor(props) {

        super(props);

        this.state = {
            authentication: {
                editor_id: "" || sessionStorage.getItem("editor_id"),
                logged_in: 0 || sessionStorage.getItem("logged_in"),
                jwt: "" || sessionStorage.getItem("jwt")
            },
            showHomeTab: true,
            showPastTab: false,
            showPresentTab: false,
            showFutureTab: false,
            hide: true
        }

        this.showTab = this.showTab.bind(this);
    }

    componentDidMount() {
        this.state.authentication;
    }

    componentDidUpdate() {
        this.state.authentication;
    }

    showTab(tab) {
        console.log(tab);
        if(tab.showHomeTab === true)
            this.setState({
                showHomeTab: true,
                showPastTab: false,
                showPresentTab: false,
                showFutureTab: false,
            });

        if(tab.showPastTab === true)
        this.setState({
            showHomeTab: false,
            showPastTab: true,
            showPresentTab: false,
            showFutureTab: false,
        });
        if(tab.showPresentTab === true)
        this.setState({
            showHomeTab: false,
            showPastTab: false,
            showPresentTab: true,
            showFutureTab: false,
        });
        if(tab.showFutureTab === true)
        this.setState({
            showHomeTab: false,
            showPastTab: false,
            showPresentTab: false,
            showFutureTab: true,
        });
    }

    render() {

        return (

            <div className="main-wrapper">
                <div className="header">
                    <a href="/" className="logo">
                        <FontAwesomeIcon icon="fa-solid fa-person-walking" />
                        <FontAwesomeIcon icon="fa-solid fa-bicycle" />
                        <FontAwesomeIcon icon="fa-solid fa-motorcycle" />
                    </a>
                    <h1>My Motorcycle Progression<FontAwesomeIcon icon="fa-solid fa-chart-line" /></h1>
                    {sessionStorage.length === 0 || sessionStorage.getItem("logged_in") == 0 ?
                        <div>
                            <FontAwesomeIcon className="gear" icon="fa-solid fa-gear"/>
                            <a className="login" href="/auth">                        
                                <FontAwesomeIcon className="door-closed" icon="fa-solid fa-door-closed" />
                                <FontAwesomeIcon className="door-open" icon="fa-solid fa-door-open" />
                            </a>
                        </div>
                    : 
                        <div>
                            <a href="/profile" className="profile">
                                <FontAwesomeIcon icon="fa-solid fa-gear" />
                            </a>
                            <a href="/" className="logout" onClick={ e => {
                                updateLoginStatus(this.state.authentication)
                                sessionStorage.clear();
                                }
                            }>
                                <FontAwesomeIcon className="door-closed" icon="fa-solid fa-door-closed" />
                                <FontAwesomeIcon className="door-open" icon="fa-solid fa-door-open" />
                            </a>
                        </div>
                    }
                </div>
                <div className="tabs-wrapper">
                    <div className="home-tab">
                            <a href="/" className="tab" onClick={e => {
                                e.preventDefault();
                                window.history.replaceState(null, "", "/");
                                this.showTab({showHomeTab: true});
                            }
                            }>Home</a>



                    </div>
                    {this.state.showHomeTab === true && <HomeTab />}
                    <div className="past-tab">
                        <a href="/past" className="tab" onClick={e => {
                            e.preventDefault();
                            window.history.replaceState(null, "", "/past");
                            this.showTab({showPastTab: true});
                        }
                        }>Past</a>


                    </div>

                    {this.state.showPastTab === true && <PastTab />}

                    <div className="present-tab">
                        <a href="/present" className="tab" onClick={e => {
                            e.preventDefault();
                            window.history.replaceState(null, "", "/present");
                            this.showTab({showPresentTab: true});
                        }
                        }>Present</a>

                  
                    </div>

                    {this.state.showPresentTab === true && <PresentTab />}

                    <div className="future-tab">
                    <a href="/future" className="tab" onClick={e => {
                            e.preventDefault();
                            window.history.replaceState(null, "", "/future");
                            this.showTab({showFutureTab: true});
                        }
                        }>Future</a>

                        
                    </div>

                    {this.state.showFutureTab === true && <FutureTab />}


                </div>
                <div className="comment-icon">
                    <button className="comment-btn" onClick={ e => {
                        
                        {this.state.hide === true? 
                            this.setState({hide: false})
                        :
                            this.setState({hide: true})
                        }
                        }
                    }> 
                        comment
                    </button>
                    {this.state.hide === false &&
                        <CommentSection />
                    }
                </div>
            </div>
        );
    }
}
