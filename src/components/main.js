import React, { Component } from "react";
import { updateLoginStatus } from "./api/editor";
import CommentSection from "./pages/layout/comment-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeTab from "./pages/home-tab";
import PastTab from "./pages/past-tab";
import PresentTab from "./pages/present-tab";
import FutureTab from "./pages/future-tab";
import Register from "./auth/register";
import Login from "./auth/login";

export default class Main extends Component {

    constructor(props) {

        super(props);

        this.state = {
            authentication: {
                editor_id: "" || sessionStorage.getItem("editor_id"),
                logged_in: 0 || sessionStorage.getItem("logged_in"),
                jwt: "" || sessionStorage.getItem("jwt")
            },

            showTabSection: this.props.show.tabSection,
            showHomeTab: this.props.show.homeTab,
            showPastTab: this.props.show.pastTab,
            showPresentTab: this.props.show.presentTab,
            showFutureTab: this.props.show.futureTab,
            showRegister: this.props.show.register,
            showLogin: this.props.show.login,
            showProfile: this.props.show.profile,
            showComments: false
        }
    }

    componentDidMount() {
        this.state.authentication;
    }

    componentDidUpdate() {
        this.state.authentication;
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

                {this.state.showTabSection === true && 
                    <div>
                        <div className="tabs-wrapper">
                    
                        
                            <a href="/" className="home-tab" ><span className="rotate">Home</span></a>


                        
                            {this.state.showHomeTab === true && <HomeTab />}

                            <a href="/past" className="past-tab"><span className="rotate">Past</span></a>


            
                            {this.state.showPastTab === true && <PastTab />}

                
                            <a href="/present" className="present-tab"><span className="rotate">Present</span></a>

            

                            {this.state.showPresentTab === true && <PresentTab />}

        
                            <a href="/future" className="future-tab"><span className="rotate">Future</span></a>
            
                            {this.state.showFutureTab === true && <FutureTab />}


                        </div>
                        <div className="comment-section">
                            <button className="comment-btn" onClick={ e => {
                                
                                {this.state.showComments === false? 
                                    this.setState({showComments: true})
                                :
                                    this.setState({showComments: false})
                                }
                                }
                            }> 
                                <FontAwesomeIcon icon="fa-solid fa-comment" />
                            </button>
                            {this.state.showComments === true &&
                                <CommentSection />
                            }
                        </div>
                        
                    </div>
                }
                {this.state.showRegister === true && <Register />}
                {this.state.showLogin === true && <Login />}
                {this.state.showProfile === true && <Profile />}

            </div>
        );
    }
}
