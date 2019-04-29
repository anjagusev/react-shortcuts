import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Shortcuts from "./Shortcuts";
import NotFound from "./NotFound";
import Analytics from "react-router-ga";

const Router = () => (
  <BrowserRouter>
    <Analytics id="UA-41136002-4" debug>
      <Switch>
        <Route exact path="/" component={Shortcuts} />
        <Route path="/:Id" component={Shortcuts} />
        <Route component={NotFound} />
      </Switch>
    </Analytics>
  </BrowserRouter>
);

export default Router;
