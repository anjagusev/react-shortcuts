import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Shortcuts from "Shortcuts";
import NotFound from "NotFound";

const Router = () => {
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Shortcuts} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>;
};

export default Router;
