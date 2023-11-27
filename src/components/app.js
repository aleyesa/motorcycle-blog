import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayoutContainer from "./pages/layout/main-layout-container";
import HomeTab from "./pages/home-tab";
import PastTab from "./pages/past-tab";
import PresentTab from "./pages/present-tab";
import FutureTab from "./pages/future-tab";
import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

  }

  render() {
    return (
      <div className="blog-container">
        <Router>
          <div>
            <MainLayoutContainer />

            <Switch>
              <Route path="/auth" />
              <Route exact path="/" component={HomeTab}/>
              <Route path="/past" component={PastTab} />
              <Route path="/present" component={PresentTab}/>
              <Route path="/future" component={FutureTab}/>
            </Switch>

          </div>
        </Router>
      </div>
    );
  }
}
