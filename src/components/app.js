import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import MainLayoutContainer from "./pages/layout/main-layout-container";
import HomeTab from "./pages/home-tab";
import PastTab from "./pages/past-tab";
import PresentTab from "./pages/present-tab";
import FutureTab from "./pages/future-tab";
import Register from "./auth/register";
import Login from "./auth/login";
import Profile from "./auth/profile";
import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();
}

  render() {
    return (
        <Router>
            <MainLayoutContainer />
            <Switch>
              <Route path="/register" component={Register}/>
              <Route path="/auth" component={Login}/>
              {sessionStorage.getItem("logged_in") == 1 &&
                <Route path="/profile" component={Profile}/>
              }
              {/* <Route exact path="/" component={HomeTab}/> */}
              {/* <Route path="/past" component={PastTab} />
              <Route path="/present" component={PresentTab}/>
              <Route path="/future" component={FutureTab}/> */}
            </Switch>
        </Router>
    );
  }
}
