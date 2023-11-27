import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayoutContainer from "./pages/layout/main-layout-container";
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
              <Route exact path="/" />
              <Route path="/past" />
              <Route path="/present" />
              <Route path="/future" />
            </Switch>

          </div>
        </Router>
      </div>
    );
  }
}
