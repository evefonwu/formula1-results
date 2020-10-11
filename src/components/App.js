import React from "react";
import Dashboard from "./Dashboard";

import Header from "./Header";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
