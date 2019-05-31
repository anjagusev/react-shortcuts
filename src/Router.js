import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Shortcuts from "./Shortcuts";
import NotFound from "./NotFound";
import Analytics from "react-router-ga";
import Tabs from "./Tabs";

const Router = () => (
  <BrowserRouter>
    <Analytics id="UA-41136002-4" debug>
      <Switch>
        <Route exact path="/" component={Tabs} />
        <Route path="/:os?/:Id?" component={Tabs} />
        <Route component={NotFound} />
      </Switch>
    </Analytics>
  </BrowserRouter>
);

export default Router;
