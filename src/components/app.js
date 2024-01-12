import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Main from "./main";
import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();
}

  render() {
    return (
        <Router>
            <Switch>
           
              <Route path="/register"><Main show={{tabSection: false, register: true}} /></Route>
              <Route path="/auth"><Main show={{tabSection: false, login: true}} /></Route>
              {sessionStorage.getItem("logged_in") == 1 &&
                <Route path="/profile"><Main showTab={{tabSection: false, profile: true}} /></Route>
              }
              <Route exact path="/"><Main show={{tabSection: true, homeTab: true}} /></Route>
              <Route path="/past"><Main show={{tabSection: true, pastTab: true}} /></Route>
              <Route path="/present"><Main show={{tabSection: true, presentTab: true}} /></Route>
              <Route path="/future"><Main show={{tabSection: true, futureTab: true}} /></Route>

            </Switch>
        </Router>
    );
  }
}
